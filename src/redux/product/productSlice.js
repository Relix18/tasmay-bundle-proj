import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const productAsync = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productsSlice.reducer;
