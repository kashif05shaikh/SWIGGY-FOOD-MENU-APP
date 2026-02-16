import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import MenuItemCard from "./MenuitemCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const cards = resInfo?.cards || [];

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

  const { name, cuisines, costForTwoMessages } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines?.join(", ")}</h3>
      <h3>{costForTwoMessages}</h3>

      <h2>Menu</h2>

      <div className="menu-list">
        {items.map((item, index) => (
          <MenuItemCard
            key={`${item.card.info.id}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
