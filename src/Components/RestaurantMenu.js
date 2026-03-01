import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import useRestaurantMenu from "../utilis/useRestaurantMenu";
import RestaurantCategory from "./RestaurantsCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, avgRatingString, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info ||
    resInfo?.cards?.[0]?.card?.card?.info ||
    {};

  const regularCards =
    resInfo?.cards
      ?.find((c) => c?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = regularCards.filter(
    (c) => c?.card?.card?.itemCards || c?.card?.card?.categories
  );

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>
      <h3>Rating: {avgRatingString}</h3>
      <h2>Menu</h2>

      {categories.length === 0 ? (
        <h3 style={{ textAlign: "center", color: "gray" }}>No menu items found.</h3>
      ) : (
        categories.map((category, index) => (
          <RestaurantCategory
            key={index}
            data={category}
            showItems={showIndex === index}
            setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
          />
        ))
      )}
    </div>
  );
};

export default RestaurantMenu;