import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import MenuItemCard from "./MenuitemCard";
import useRestaurantMenu from "../utilis/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const cards = resInfo?.cards || [];

  // ✅ Try multiple known Swiggy data paths for menu items
  const regularCards =
    cards
      .find((c) => c?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const items = regularCards.flatMap((c) => {
    const card = c?.card?.card;
    if (card?.itemCards) return card.itemCards;
    if (card?.categories)
      return card.categories.flatMap((cat) => cat.itemCards || []);
    return [];
  });

  // ✅ Try multiple index positions for restaurant info (varies by restaurant)
  const restaurantInfo =
    resInfo?.cards?.[2]?.card?.card?.info ||
    resInfo?.cards?.[0]?.card?.card?.info ||
    resInfo?.cards?.[1]?.card?.card?.info ||
    {};

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // 🔍 DEBUG — open browser console to see the raw API response
  console.log("=== FULL resInfo ===", resInfo);
  console.log("=== cards ===", cards);
  console.log("=== regularCards ===", regularCards);
  console.log("=== items found ===", items.length, items);
  console.log("=== restaurantInfo ===", restaurantInfo);

  return (
    <div className="menu">
      <h1>{name || "Restaurant"}</h1>
      <h3>{cuisines?.join(", ")}</h3>
      <h3>{costForTwoMessage}</h3>

      <h2>Menu</h2>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px", color: "gray" }}>
          <h3>No menu items found.</h3>
          <p>Open browser Console (F12) and check the logs to debug.</p>
        </div>
      ) : (
        <div className="menu-list">
          {items.map((item, index) => (
            <MenuItemCard
              key={`${item?.card?.info?.id}-${index}`}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;