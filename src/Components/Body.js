import resList from "../utilis/Mock.data.js";
import RestaurantCard from "./RestaurantCard.js";
import { useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  return (
    <div className="body">
      {/* FILTER */}
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
        TOP RATED RESTAURANTS
        </button>
      </div>

      {/* SEARCH (UI only for now) */}
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

      {/* RESTAURANTS */}
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.data.id}   // ✅ unique key
            resData={restaurant.data}  // ✅ pass inner data object
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
