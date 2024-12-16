import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
