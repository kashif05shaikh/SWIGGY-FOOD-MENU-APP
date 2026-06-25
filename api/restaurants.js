const LIST_URL =
  "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&carousel=true&third_party_vendor=1";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
};

module.exports = async (req, res) => {
  const lat = req.query.lat || "19.07480";
  const lng = req.query.lng || "72.88560";
  const targetUrl = `${LIST_URL}&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;

  try {
    const response = await fetch(targetUrl, { headers });
    const body = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(body);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
};
