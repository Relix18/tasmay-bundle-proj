import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";
import orderReducer from "./order/orderSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
