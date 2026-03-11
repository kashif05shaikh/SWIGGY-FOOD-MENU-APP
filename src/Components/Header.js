import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { LOGO_URL } from "../utilis/constant";
import useOnlineStatus from "../utilis/useOnlinestatus";
import UserContext from "./UserContext";
import { useSelector } from "react-redux";
import { useDarkMode } from "./DarkModeContext.js"; // ← add .js
const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("LOGIN");
  const onlineStatus   = useOnlineStatus();
  const { loggedinUser } = useContext(UserContext);
  const cartitems      = useSelector((store) => store.cart.items);
  const { isDark, toggleDark } = useDarkMode();

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>ONLINE STATUS: {onlineStatus ? "🟢" : "🔴"}</li>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT US</Link></li>
          <li>
            <Link to="/cart" className="cart-nav-link">
              🛒 CART
              {cartitems.length > 0 && (
                <span className="cart-badge">{cartitems.length}</span>
              )}
            </Link>
          </li>
          <li><Link to="/grocery">GROCERY</Link></li>

          {/* 🌙 DARK MODE TOGGLE */}
          <li>
            <button className="dark-toggle" onClick={toggleDark} title="Toggle dark mode">
              {isDark ? "☀️" : "🌙"}
            </button>
          </li>

          <button
            className="login-btn"
            onClick={() => setbtnNameReact(btnNameReact === "LOGIN" ? "LOGOUT" : "LOGIN")}
          >
            {btnNameReact}
          </button>
          <li className="user-name-nav">{loggedinUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;