import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utilis/cartslice";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

export default appStore;