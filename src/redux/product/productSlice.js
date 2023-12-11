import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductByBrand,
  fetchProductByCategory,
  fetchProductById,
  fetchProducts,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  selectedProduct: null,
};

export const productAsync = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const productByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const productByBrandAsync = createAsyncThunk(
  "products/fetchProductByBrand",
  async () => {
    const response = await fetchProductByBrand();
    return response.data;
  }
);
export const productByCategoryAsync = createAsyncThunk(
  "products/fetchProductByCategories",
  async () => {
    const response = await fetchProductByCategory();
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
      })
      .addCase(productByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(productByBrandAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productByBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(productByCategoryAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productByCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const productStatus = (state) => state.product.status;

export default productsSlice.reducer;
