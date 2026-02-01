import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header.js";
import Body from "./Components/Body.js";

// ✅ Header
// ✅ Restaurant Card (destructure directly in parameter)
// ✅ Array of restaurants
// ✅ Body
// ✅ App Layout
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

// ✅ Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
