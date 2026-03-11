import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearcart, addItem } from "../utilis/cartslice";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext"; 

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { isDark } = useDarkMode();

  // group duplicate items to show quantity
  const grouped = cartItems.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) acc[key] = { ...item, qty: 1 };
    else acc[key].qty += 1;
    return acc;
  }, {});
  const groupedItems = Object.values(grouped);

  const subtotal = cartItems.reduce((a, i) => a + (i?.price || i?.defaultPrice || 0) / 100, 0);
  const gst      = +(subtotal * 0.05).toFixed(2);
  const toPay    = +(subtotal * 1.05).toFixed(2);

  const handleRemoveOne = (item) => {
    const idx = cartItems.findLastIndex(i => i.name === item.name);
    dispatch(removeItem(idx));
  };

  const handleAddOne = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className={`cart-page ${isDark ? "dark" : ""}`}>

      {/* ── EMPTY STATE ── */}
      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <div className="empty-emoji">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add delicious items from a restaurant!</p>
          <button className="back-home-btn" onClick={() => navigate("/")}>
            Browse Restaurants →
          </button>
        </div>
      ) : (
        <div className="cart-layout">

          {/* ══ LEFT: items list ══ */}
          <div className="cart-left">
            <div className="cart-left-header">
              <h1 className="cart-heading">
                🛒 Your Cart
                <span className="cart-count">({cartItems.length} items)</span>
              </h1>
              <button className="clear-btn" onClick={() => dispatch(clearcart())}>
                🗑 Clear All
              </button>
            </div>

            <div className="cart-items-list">
              {groupedItems.map((item, i) => (
                <div className="cart-card" key={i}>
                  <img
                    className="cart-card-img"
                    src={
                      item?.imageId
                        ? CDN_URL + item.imageId
                        : "https://via.placeholder.com/90"
                    }
                    alt={item?.name}
                  />
                  <div className="cart-card-info">
                    <p className="cart-card-name">{item?.name}</p>
                    {item?.ratings?.aggregatedRating?.rating && (
                      <p className="cart-card-rating">
                        ⭐ {item.ratings.aggregatedRating.rating}
                      </p>
                    )}
                    <p className="cart-card-price">
                      ₹{((item?.price || item?.defaultPrice || 0) / 100).toFixed(2)} × {item.qty}
                    </p>
                  </div>

                  {/* quantity controls */}
                  <div className="cart-qty-controls">
                    <button className="qty-btn minus" onClick={() => handleRemoveOne(item)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn plus" onClick={() => handleAddOne(item)}>+</button>
                  </div>

                  <p className="cart-card-total">
                    ₹{(((item?.price || item?.defaultPrice || 0) / 100) * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* promo code */}
            <div className="promo-box">
              <span className="promo-icon">🏷</span>
              <input className="promo-input" placeholder="Enter promo code" />
              <button className="promo-apply">APPLY</button>
            </div>
          </div>

          {/* ══ RIGHT: bill summary + pay ══ */}
          <div className="cart-right">
            <div className="bill-card">
              <h3 className="bill-card-title">Bill Details</h3>

              <div className="bill-line">
                <span>Item Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="bill-line">
                <span>Delivery Fee</span>
                <span className="free-tag">FREE</span>
              </div>
              <div className="bill-line">
                <span>GST & Charges</span>
                <span>₹{gst}</span>
              </div>
              <div className="bill-line savings">
                <span>🎉 Total Savings</span>
                <span className="savings-val">−₹{(subtotal * 0.1).toFixed(2)}</span>
              </div>

              <div className="bill-divider" />

              <div className="bill-total-line">
                <span>TO PAY</span>
                <span>₹{toPay.toFixed(2)}</span>
              </div>

              <button className="pay-btn" onClick={() => navigate("/checkout")}>
                <span>Proceed to Pay</span>
                <span className="pay-amt">₹{toPay.toFixed(2)}</span>
              </button>

              <p className="safe-tag">🔒 100% Secure Payments</p>

              <div className="pay-icons">
                {["GPay", "PhonePe", "Paytm", "UPI", "Card"].map(p => (
                  <span key={p} className="pay-icon-chip">{p}</span>
                ))}
              </div>
            </div>

            {/* delivery info */}
            <div className="delivery-card">
              <span className="delivery-icon">🛵</span>
              <div>
                <p className="delivery-title">Estimated Delivery</p>
                <p className="delivery-time">30 – 40 minutes</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;