const fallbackRestaurantPayload = require("../data/fallbackRestaurants");

const LIST_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
  "X-Requested-With": "XMLHttpRequest",
};

module.exports = async (req, res) => {
  const lat = req.query.lat || "19.07480";
  const lng = req.query.lng || "72.88560";
  const targetUrl = `${LIST_URL}&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;

  try {
    const response = await fetch(targetUrl, { headers });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "";

    res.setHeader("Content-Type", "application/json");

    if (!contentType.includes("application/json")) {
      res.status(200).json(fallbackRestaurantPayload);
      return;
    }

    res.status(response.status).send(body);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
};
