export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/";

export const LOGO_URL =
  "https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png";

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

const deployedApiBaseUrl =
  typeof process !== "undefined" && process.env
    ? process.env.API_BASE_URL
    : "";

export const API_BASE_URL =
  deployedApiBaseUrl || (isLocalhost ? "http://localhost:3001/api" : "/api");

export const RESTAURANT_API =
  `${API_BASE_URL}/restaurants?lat=19.07480&lng=72.88560`;

// ✅ Use real Swiggy menu API directly
export const MENU_API =
  `${API_BASE_URL}/menu?restaurantId=`;
