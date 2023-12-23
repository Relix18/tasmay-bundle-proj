import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  orderPlaced: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await fetchCreateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderPlaced = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.orderPlaced = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectOrderPlaced = (state) => state.order.orderPlaced;

export default orderSlice.reducer;
