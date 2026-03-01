import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearcart } from "../utilis/cartslice";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">

      {/* HEADER */}
      <div className="cart-header">
        <h1 className="cart-title">
          🛒 Your Cart
          <span>({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
        </h1>
        {cartItems.length > 0 && (
          <button className="cart-clear-btn" onClick={() => dispatch(clearcart())}>
            Clear Cart
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🍽️</div>
          <h2>Your cart is empty</h2>
          <p>Add items from a restaurant to get started!</p>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="cart-items-box">
            {cartItems.map((item, index) => (
              <div className="cart-item-row" key={index}>

                {/* LEFT — name, price, rating */}
                <div className="cart-item-left">
                  <p className="cart-item-name">{item?.name || "Unknown Item"}</p>
                  <p className="cart-item-price">
                    ₹{((item?.price || item?.defaultPrice || 0) / 100).toFixed(2)}
                  </p>
                  {item?.ratings?.aggregatedRating?.rating && (
                    <p className="cart-item-rating">
                      ⭐ {item.ratings.aggregatedRating.rating}{" "}
                      ({item.ratings.aggregatedRating.ratingCountV2})
                    </p>
                  )}
                </div>

                {/* RIGHT — image + remove button side by side */}
                <div className="cart-item-right">
                  <img
                    className="cart-item-img"
                    src={
                      item?.imageId
                        ? CDN_URL + item.imageId
                        : "https://via.placeholder.com/100"
                    }
                    alt={item?.name}
                  />
                  <button
                    className="cart-remove-btn"
                    onClick={() => dispatch(removeItem(index))}
                  >
                    REMOVE −
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* BILL SUMMARY */}
          <div className="bill-box">
            <h2 className="bill-title">Bill Summary</h2>

            <div className="bill-row">
              <span className="bill-label">Item Total</span>
              <span className="bill-value">
                ₹{cartItems
                  .reduce((acc, item) => acc + (item?.price || item?.defaultPrice || 0) / 100, 0)
                  .toFixed(2)}
              </span>
            </div>

            <div className="bill-row">
              <span className="bill-label">Delivery Fee</span>
              <span className="bill-value free">FREE</span>
            </div>

            <div className="bill-row">
              <span className="bill-label">GST & Charges (5%)</span>
              <span className="bill-value">
                ₹{(cartItems
                  .reduce((acc, item) => acc + (item?.price || item?.defaultPrice || 0) / 100, 0) * 0.05)
                  .toFixed(2)}
              </span>
            </div>

            <div className="bill-total-row">
              <span className="bill-total-label">TO PAY</span>
              <span className="bill-total-value">
                ₹{(cartItems
                  .reduce((acc, item) => acc + (item?.price || item?.defaultPrice || 0) / 100, 0) * 1.05)
                  .toFixed(2)}
              </span>
            </div>
          </div>

          {/* PLACE ORDER */}
          <button className="place-order-btn">
            Proceed to Pay 🍴
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;