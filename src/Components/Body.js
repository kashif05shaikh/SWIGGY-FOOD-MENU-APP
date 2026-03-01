import { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import "./style.css";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlinestatus";
import UserContext from "./UserContext";

const API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { loggedinUser, setLoggedinUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(API_URL);
      const json = await data.json();

      const restaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const filterTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => Number(res.info.avgRating) > 4.5
    );
    setFilteredRestaurant(filtered);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <h1>Please check your internet connection!</h1>;

  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRated}>
          TOP RATED RESTAURANTS
        </button>
      </div>

      <div className="search">
        <input
          type="text"
          className="search-box"
          value={searchText}
          placeholder="Search restaurants..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={() => {
            const filtered = listOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filtered);
          }}
        >
          Search
        </button>
      </div>

      <div className="username-wrapper">
        <span className="username-icon">👤</span>
        <div className="username-field-group">
          <span className="username-label">USERNAME</span>
          <input
            value={loggedinUser}
            onChange={(e) => setLoggedinUser(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;