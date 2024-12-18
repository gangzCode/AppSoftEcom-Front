import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishListofUser,
  addToWishlist,
  deleteWishlistItem,
} from "../../services/apiCalls";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishListofUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch wishlist"
      );
    }
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addItem",
  async (productId, { dispatch }) => {
    try {
      await addToWishlist(productId);
      return dispatch(fetchWishlist()).unwrap();
    } catch (error) {
      throw error.response?.data || "Failed to add item to wishlist";
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeItem",
  async (wishlistId, { dispatch }) => {
    try {
      await deleteWishlistItem(wishlistId);
      return dispatch(fetchWishlist()).unwrap();
    } catch (error) {
      throw error.response?.data || "Failed to remove item from wishlist";
    }
  }
);
