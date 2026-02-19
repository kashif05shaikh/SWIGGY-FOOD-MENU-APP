const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

const MenuItemCard = ({ item }) => {
  const {
    name,
    price,
    defaultPrice,
    imageId,
    ratings,
  } = item.card.info;

  return (
    <>
      <div className="menu-item">
        {/* LEFT CONTENT */}
        <div className="menu-left">
          <h3>{name}</h3>
          <p className="price">
            ₹{(price || defaultPrice) / 100}
          </p>
          {ratings?.aggregatedRating?.rating && (
            <p className="rating">
              ⭐ {ratings.aggregatedRating.rating}{" "}
              ({ratings.aggregatedRating.ratingCountV2})
            </p>
          )}
        </div>
        {/* RIGHT CONTENT */}
        <div className="menu-right">
          <img
            src={
              imageId
                ? CDN_URL + imageId
                : "https://via.placeholder.com/120"
            }
            alt={name}
          />
          {/* DUMMY CONTAINER BELOW IMAGE */}
          <div className="dummy-box">Customisable</div>
        </div>
      </div>
      {/* DIVIDER LINE */}
      <hr className="menu-divider" />
    </>
  );
};

export default MenuItemCard;