import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.cartCount = action.payload.length;
    },
    addItemStart: (state) => {
      state.loading = true;
    },
    addItemSuccess: (state, action) => {
      console.log("action.payload", action.payload);

      state.items.push(action.payload);
      state.cartCount = state.items.length;
      state.loading = false;
    },
    removeItem: (state, action) => {
      state.cartCount = state.cartCount - 1;
    },
    addItemFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCartItems,
  addItemStart,
  addItemSuccess,
  addItemFailure,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
