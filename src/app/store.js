//Creates and configures the Redux store.
//Combines all slices (products, cart, ui) into one global state.

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    ui: uiReducer,
  },
});

export default store;