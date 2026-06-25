const http = require("http");
const fallbackRestaurantPayload = require("./data/fallbackRestaurants");

const PORT = process.env.PORT || 3001;

const LIST_URLS = [
  "https://www.swiggy.com/dapi/restaurants/list/v5?is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
  "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&carousel=true&third_party_vendor=1",
];

const MENU_URL =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&submitAction=ENTER&restaurantId=";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
  "X-Requested-With": "XMLHttpRequest",
};

const sendJson = (res, status, data) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(typeof data === "string" ? data : JSON.stringify(data));
};

const fetchJsonText = async (targetUrl) => {
  const response = await fetch(targetUrl, { headers });
  const body = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok || !contentType.includes("application/json")) {
    throw new Error(`Swiggy returned ${response.status} ${contentType}`);
  }

  return { status: response.status, body };
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, "");
    return;
  }

  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);

  try {
    if (requestUrl.pathname === "/api/restaurants") {
      const lat = requestUrl.searchParams.get("lat") || "19.07480";
      const lng = requestUrl.searchParams.get("lng") || "72.88560";

      for (const listUrl of LIST_URLS) {
        try {
          const targetUrl = `${listUrl}&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;
          const result = await fetchJsonText(targetUrl);
          sendJson(res, result.status, result.body);
          return;
        } catch (error) {
          console.warn(error.message);
        }
      }

      sendJson(res, 200, fallbackRestaurantPayload);
      return;
    }

    if (requestUrl.pathname === "/api/menu") {
      const restaurantId = requestUrl.searchParams.get("restaurantId");

      if (!restaurantId) {
        sendJson(res, 400, { error: "restaurantId is required" });
        return;
      }

      const result = await fetchJsonText(MENU_URL + encodeURIComponent(restaurantId));
      sendJson(res, result.status, result.body);
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    sendJson(res, 502, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
