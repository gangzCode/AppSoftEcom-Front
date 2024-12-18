import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, getIPAddress } from "../../services/apiCalls";

// const baseUrl = "https://yalpos.com/custom/Electronics/computerzone/public/api";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (_, { dispatch }) => {
    try {
      const userStr = localStorage.getItem("user");
      let response;

      if (userStr) {
        const token = JSON.parse(userStr).token;
        response = await axios.get(`${baseUrl}/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const ip_address = await getIPAddress();
        response = await axios.get(`${baseUrl}/card-details`, {
          params: { ip_address },
        });
      }
      return response.data.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch cart items";
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (productData, { dispatch }) => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const token = JSON.parse(userStr).token;
        await axios.post(
          `${baseUrl}/add-card`,
          { products: [productData] },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        const ip_address = await getIPAddress();
        await axios.post(`${baseUrl}/guest/add-card`, {
          ip_address,
          products: [productData],
        });
      }
      // Fetch updated cart after adding item
      return dispatch(fetchCartItems()).unwrap();
    } catch (error) {
      throw error.response?.data || "Failed to add item to cart";
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId, { dispatch }) => {
    try {
      const userStr = localStorage.getItem("user");
      let response;

      if (userStr) {
        const token = JSON.parse(userStr).token;
        response = await axios.delete(`${baseUrl}/card/remove/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        const ip_address = await getIPAddress();
        response = await axios.delete(`${baseUrl}/card/remove/${productId}`, {
          params: { ip_address },
          headers: { "Content-Type": "application/json" },
        });
      }
      return productId;
    } catch (error) {
      throw error.response?.data || "Failed to remove item from cart";
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (cartItem, { dispatch }) => {
    try {
      const cartResponse = fetchCartItems();
      const currentCartItems = cartResponse.data || [];

      const updatedProducts = currentCartItems.map((item) =>
        item.card_id === cartItem.card_id
          ? {
              line_id: item.card_id,
              quantity: cartItem.quantity,
              discount: cartItem.discount || "",
            }
          : {
              line_id: item.card_id,
              quantity: item.quantity,
              discount: item.discount || "",
            }
      );

      const userStr = localStorage.getItem("user");
      let response;

      if (userStr) {
        const token = JSON.parse(userStr).token;
        response = await axios.put(
          `${baseUrl}/card-update`,
          { products: updatedProducts },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const ip = await getIPAddress();
        response = await axios.put(
          `${baseUrl}/card/update`,
          {
            ip_address: ip,
            products: updatedProducts,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return dispatch(fetchCartItems()).unwrap();
    } catch (error) {
      throw error.response?.data || "Failed to update cart item";
    }
  }
);
