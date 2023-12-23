import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  addItem,
  deleteItem,
  updateItem,
  fetchItemsByUser,
  resetCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const cartAsync = createAsyncThunk("cart/fetchItems", async (item) => {
  const response = await fetchItems(item);
  return response.data;
});

export const itemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUser",
  async (userId) => {
    const response = await fetchItemsByUser(userId);
    return response.data;
  }
);

export const addAsync = createAsyncThunk("cart/addItems", async (item) => {
  const response = await addItem(item);
  return response.data;
});

export const deleteAsync = createAsyncThunk("cart/deleteItem", async (id) => {
  await deleteItem(id);
  return id;
});
export const updateAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(itemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(itemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
