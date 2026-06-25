const http = require("http");
const { spawn } = require("child_process");
const path = require("path");

const PORT = 3001;
const LIST_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
const MENU_URL =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&submitAction=ENTER&restaurantId=";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
};

const send = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:1234",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, "");
    return;
  }

  try {
    const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
    let targetUrl;

    if (requestUrl.pathname === "/api/restaurants") {
      targetUrl = LIST_URL;
    } else if (requestUrl.pathname === "/api/menu") {
      const restaurantId = requestUrl.searchParams.get("restaurantId");
      if (!restaurantId) {
        send(res, 400, JSON.stringify({ error: "restaurantId is required" }));
        return;
      }
      targetUrl = MENU_URL + encodeURIComponent(restaurantId);
    } else {
      send(res, 404, JSON.stringify({ error: "Not found" }));
      return;
    }

    console.log(`Proxying ${requestUrl.pathname} -> ${targetUrl}`);
    const response = await fetch(targetUrl, { headers });
    const body = await response.text();
    send(res, response.status, body);
  } catch (error) {
    send(res, 502, JSON.stringify({ error: error.message }));
  }
});

if (process.argv.includes("--proxy-only")) {
  server.listen(PORT, () => {
    console.log(`API proxy running at http://localhost:${PORT}`);
  });
  return;
}

const parcelBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "parcel",
  "lib",
  "bin.js"
);

let parcel;
let proxyStarted = false;

const startParcel = () => {
  if (parcel) return;

  parcel = spawn(process.execPath, [parcelBin, "index.html", "--dist-dir", ".parcel-dist"], {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    shell: false,
  });

  parcel.on("exit", (code) => {
    if (proxyStarted) {
      server.close();
    }
    process.exit(code ?? 0);
  });
};

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`API proxy already running at http://localhost:${PORT}`);
    startParcel();
    return;
  }

  throw error;
});

server.listen(PORT, () => {
  proxyStarted = true;
  console.log(`API proxy running at http://localhost:${PORT}`);
  startParcel();
});

const shutdown = () => {
  if (proxyStarted) {
    server.close();
  }
  if (parcel) {
    parcel.kill();
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
