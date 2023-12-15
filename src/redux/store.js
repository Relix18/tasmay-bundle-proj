import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
