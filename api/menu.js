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

module.exports = async (req, res) => {
  const { restaurantId } = req.query;

  if (!restaurantId) {
    res.status(400).json({ error: "restaurantId is required" });
    return;
  }

  try {
    const response = await fetch(MENU_URL + encodeURIComponent(restaurantId), {
      headers,
    });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "";

    res.setHeader("Content-Type", "application/json");

    if (!contentType.includes("application/json")) {
      res.status(502).json({
        error: "Swiggy returned HTML instead of JSON",
        status: response.status,
      });
      return;
    }

    res.status(response.status).send(body);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
};
