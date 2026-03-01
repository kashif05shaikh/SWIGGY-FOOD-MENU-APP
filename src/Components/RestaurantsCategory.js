import MenuItemCard from "./MenuitemCard";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const items =
    data?.card?.card?.itemCards ||
    data?.card?.card?.categories?.flatMap((cat) => cat?.itemCards || []) ||
    [];

  return (
    <div className="category">
      <div className="category-header" onClick={setShowIndex}>
        <span>
          {data?.card?.card?.title} ({items.length})
        </span>
        <span>{showItems ? "▲" : "▼"}</span>
      </div>

      {showItems && (
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

export default RestaurantCategory;