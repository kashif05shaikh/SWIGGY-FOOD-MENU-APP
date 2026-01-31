import React from "react";
import ReactDOM from "react-dom/client";

// ✅ Header
const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://www.shutterstock.com/image-vector/illustration-famous-indian-dish-biryani-600nw-654856615.jpg"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>HOME</li>
          <li>ABOUT</li>
          <li>CONTACT US</li>
          <li>CART</li>
        </ul>
      </div>
    </div>
  );
};

// ✅ Restaurant Card (destructure directly in parameter)
const RestaurantCard = ({
  resData: {
    data: { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId },
  },
}) => {
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        alt="res-logo"
        src={"https://media-assets.swiggy.com/swiggy/image/upload/" + cloudinaryImageId}
      />

      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>₹{costForTwo / 100} for two</h4>
      <h4>{sla.deliveryTime} mins</h4>
    </div>
  );
};

// ✅ Array of restaurants
const resList = [
  {
    data: {
      id: "990572",
      name: "Smokin Curries",
      cloudinaryImageId:
        "FOOD_CATALOG/IMAGES/CMS/2024/12/30/853cfd09-8c99-41fa-be52-25688221b358_7bf28e68-5db1-4548-8fa7-153354965ad4.jpg_compressed",
      cuisines: ["Tandoor"],
      avgRating: 4.6,
      costForTwo: 50000,
      sla: { deliveryTime: 39 },
    },
  },
  {
    data: {
      id: "448490",
      name: "Barbeque Nation",
      cloudinaryImageId: "nyudxonxnff3pptpoywr",
      cuisines: ["North Indian", "Barbecue", "Biryani", "Street Food", "Snacks"],
      avgRating: 3.9,
      costForTwo: 60000,
      sla: { deliveryTime: 30 },
    },
  },
  {
    data: {
      id: "294454",
      name: "ITC Maratha - Gourmet Couch",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/10/17/0375298c-7585-47f8-b691-84881fa5c360_294454.jpg",
      cuisines: ["Indian", "Chinese"],
      avgRating: 4.5,
      costForTwo: 300000,
      sla: { deliveryTime: 71 },
    },
  },
  {
    data: {
      id: "639509",
      name: "Dum Safar Biryani",
      cloudinaryImageId: "kbkr6vrtwjes0squcoqf",
      cuisines: ["Biryani", "Kebabs", "North Indian", "Barbecue"],
      avgRating: 3.8,
      costForTwo: 50000,
      sla: { deliveryTime: 28 },
    },
  },
  {
    data: {
      id: "335000",
      name: "ITC Maratha - Biryani And Pulao Collection",
      cloudinaryImageId: "602cfb255b417067a3bc4fc1b46ae6be",
      cuisines: ["Indian"],
      avgRating: 4.3,
      costForTwo: 150000,
      sla: { deliveryTime: 75 },
    },
  },
  {
    data: {
      id: "1073472",
      name: "Charcoal Eats - Biryani & Beyond",
      cloudinaryImageId:
        "FOOD_CATALOG/IMAGES/CMS/2025/5/17/b182d547-4323-4ec1-b414-be1bced676ab_6cfd8a1d-821a-4d89-9dd6-bcdd5cdd549f.jpg",
      cuisines: ["Biryani", "Kebabs", "North Indian"],
      avgRating: 4.4,
      costForTwo: 55000,
      sla: { deliveryTime: 27 },
    },
  },
  {
    data: {
      id: "296658",
      name: "Big Bowl",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/22/deff0d02-ca1d-4ef9-9d62-b0cbeabf33d3_296658.JPG",
      cuisines: ["Chinese", "Tibetan", "Desserts"],
      avgRating: 4.3,
      costForTwo: 30000,
      sla: { deliveryTime: 41 },
    },
  },
];

// ✅ Body
const Body = () => {
  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        /> 
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

// ✅ App Layout
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

// ✅ Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
