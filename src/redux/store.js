import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
  },
});

export default store;
