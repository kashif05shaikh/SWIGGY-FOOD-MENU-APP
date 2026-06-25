const fallbackRestaurants = [
  {
    info: {
      id: "243517",
      name: "KFC",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/4/11/9ce074d4-d5b5-4176-9c55-6c26bbe11387_243517.JPG",
      cuisines: ["Burgers", "Fast Food"],
      avgRating: 4.2,
      costForTwo: "Rs 400 for two",
      areaName: "Kurla West",
      sla: { deliveryTime: 52 },
    },
  },
  {
    info: {
      id: "23681",
      name: "McDonald's",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/3/f6e1d2d5-285b-4f6d-8a0d-828b828b0fb4_23681.jpg",
      cuisines: ["Burgers", "Beverages", "Cafe"],
      avgRating: 4.3,
      costForTwo: "Rs 400 for two",
      areaName: "Bandra Kurla Complex",
      sla: { deliveryTime: 35 },
    },
  },
  {
    info: {
      id: "11239",
      name: "Pizza Hut",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/bb6cd84d-acee-4f04-a66d-6843ff6edaf5_11239.JPG",
      cuisines: ["Pizzas"],
      avgRating: 4.1,
      costForTwo: "Rs 350 for two",
      areaName: "Kurla",
      sla: { deliveryTime: 40 },
    },
  },
  {
    info: {
      id: "78036",
      name: "Burger King",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/d8bdde5c-8269-43eb-bb81-8f68d9caa82b_78036.jpg",
      cuisines: ["Burgers", "American"],
      avgRating: 4.4,
      costForTwo: "Rs 350 for two",
      areaName: "Phoenix Marketcity",
      sla: { deliveryTime: 38 },
    },
  },
  {
    info: {
      id: "39131",
      name: "Subway",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/21/7ccf36ac-4b6c-4305-9763-7ee06570d103_39131.JPG",
      cuisines: ["Salads", "Snacks", "Desserts"],
      avgRating: 4.2,
      costForTwo: "Rs 300 for two",
      areaName: "Kurla West",
      sla: { deliveryTime: 32 },
    },
  },
  {
    info: {
      id: "28405",
      name: "Domino's Pizza",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/14/b4f893bb-9ad7-4443-bf2e-67f53830cf77_28405.JPG",
      cuisines: ["Pizzas", "Italian"],
      avgRating: 4.0,
      costForTwo: "Rs 400 for two",
      areaName: "Saki Naka",
      sla: { deliveryTime: 45 },
    },
  },
];

const fallbackRestaurantPayload = {
  statusCode: 0,
  data: {
    statusMessage: "fallback restaurants",
    cards: [
      {
        card: {
          card: {
            gridElements: {
              infoWithStyle: {
                restaurants: fallbackRestaurants,
              },
            },
          },
        },
      },
    ],
  },
};

module.exports = fallbackRestaurantPayload;
