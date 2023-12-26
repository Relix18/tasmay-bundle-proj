import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsBrand,
  fetchProductsCategory,
  fetchProductById,
  fetchProducts,
  fetchProductBySearch,
  fetchProductByFilter,
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
export const productsBrandAsync = createAsyncThunk(
  "products/fetchProductsBrand",
  async () => {
    const response = await fetchProductsBrand();
    return response.data;
  }
);
export const productsCategoryAsync = createAsyncThunk(
  "products/fetchProductsCategory",
  async () => {
    const response = await fetchProductsCategory();
    return response.data;
  }
);

export const productByFilterAsync = createAsyncThunk(
  "products/fetchProductByFilter",
  async (filter) => {
    const response = await fetchProductByFilter(filter);
    return response.data;
  }
);

export const productBySearchAsync = createAsyncThunk(
  "products/fetchProductBySearch",
  async (search) => {
    const response = await fetchProductBySearch(search);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(productByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(productsBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(productsCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(productByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      .addCase(productBySearchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productBySearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const productStatus = (state) => state.product.status;

export default productsSlice.reducer;
