import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../Components/Header.js";
import Body from "../Components/Body.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "../Components/About.js";
import Contact from "../Components/Contact.js";
import Error from "../Components/Error.js";
import RestaurantMenu from "../Components/RestaurantMenu.js";
import Cart from "../Components/cart.js";
import Checkout from "../Components/Checkout.js";
import { lazy, Suspense } from "react";
import UserContext from "../Components/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./appStore.js";
import { DarkModeProvider } from "../Components/DarkModeContext.js"; // ← exact case

const Grocery = lazy(() => import("../Components/grocery.js"));

const AppLayout = () => {
  const [userInfo, setUserInfo] = useState("Guest");

  useEffect(() => {
    const data = { name: "SHAIKH KASHIF" };
    setUserInfo(data.name);
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedinUser: userInfo, setLoggedinUser: setUserInfo }}
    >
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/",                   element: <Body /> },
        { path: "/about",              element: <About /> },
        { path: "/contact",            element: <Contact /> },
        {
          path: "/grocery",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Grocery />
            </Suspense>
          ),
        },
        { path: "/cart",               element: <Cart /> },
        { path: "/checkout",           element: <Checkout /> },
        { path: "/restaurants/:resId", element: <RestaurantMenu /> },
      ],
      errorElement: <Error />,
    },
  ],
  {
    future: { v7_startTransition: true },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <DarkModeProvider>
      <RouterProvider router={appRouter} />
    </DarkModeProvider>
  </Provider>
);