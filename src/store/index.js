import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice"; // Import your slices

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
