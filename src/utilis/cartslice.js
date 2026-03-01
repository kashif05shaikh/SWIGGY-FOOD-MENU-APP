import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // remove by index passed from Cart.js
      state.items.splice(action.payload, 1);
    },
    clearcart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearcart } = cartSlice.actions;
export default cartSlice.reducer;