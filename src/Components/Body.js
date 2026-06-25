import { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import "./style.css";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlinestatus";
import UserContext from "./UserContext";
import { RESTAURANT_API } from "../utilis/constant";

const findRestaurants = (cards = []) => {
  for (const card of cards) {
    const restaurants =
      card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    if (Array.isArray(restaurants) && restaurants.length > 0) {
      return restaurants;
    }
  }

  return [];
};

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
      const data = await fetch(RESTAURANT_API);
      if (!data.ok) {
        throw new Error(`Restaurant API failed with ${data.status}`);
      }
      const json = await data.json();

      const restaurants = findRestaurants(json?.data?.cards);

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.warn("Error fetching restaurants:", error);
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
