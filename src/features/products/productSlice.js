import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../services/apiCalls";

// Async Thunks
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    console.log('thunk');
    
    return await fetchProducts();
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId) => {
    return await fetchProductById(productId);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
