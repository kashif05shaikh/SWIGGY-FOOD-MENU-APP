import { CDN_URL } from "../utilis/constant";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } = resData;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt={name}
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} mins</h4>
    </div>
  );
};

export default RestaurantCard;