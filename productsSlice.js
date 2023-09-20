import { STATUS } from "../../constants/status";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpService from "../../api/client";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await httpService("products");
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const { data } = await httpService("products/categories");
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    status: STATUS.IDLE,
    items: [],
    categories: {
      status: STATUS.IDLE,
      items: [],
    },
  },
  reducers: {
    setAddedToCart(state, action) {
      const productId = action.payload.id;
      const productIsAdded = action.payload.isAdded;

      state.items.forEach((product) => {
        if (product.id === productId) {
          product.isAddedToCart = productIsAdded;
        }
      });
    },
    resetAddedToCart(state) {
      state.items.forEach((product) => {
        product.isAddedToCart = false;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.status = STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.status = STATUS.FULFILLED;
        state.categories.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.status = STATUS.ERROR;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.items = action.payload.map((product) => ({
          ...product,
          isAddedToCart: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const { setAddedToCart, resetAddedToCart } = productsSlice.actions;
export default productsSlice.reducer;
