import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const baseUrl = "https://ecom-test2.yalpos.com/api";
// export const baseUrl =
//   "https://yalpos.com/custom/Electronics/computerzone/public/api";

export const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error getting IP:", error);
    return "0.0.0.0";
  }
};

export const getAuthToken = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new Error("User not authenticated");
  }

  try {
    const userData = JSON.parse(userStr);
    if (!userData.token) {
      throw new Error("Invalid authentication token");
    }
    return userData.token;
  } catch (error) {
    console.error("Error parsing user data:", error);
    throw new Error("Authentication failed");
  }
};

export const getCategoriesForAllCategoriesDrop = async () => {
  try {
    const res = await axios.get(baseUrl + "/all-categories?items=", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getTopCategoriesForMenu = async () => {
  try {
    const res = await axios.get(baseUrl + "/top-categories?items=", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const updateUserProfile = async (userData, token) => {
  try {
    const res = await axios.put(baseUrl + "/profile/update", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getBestSellingProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/products/best-sale?items=", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getDayFlashSaleProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/day-flash-sale", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getSpecialDayOfferSaleProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/special-offer", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getDealsofDayProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/deal-of-day", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getUserAddress = async (token) => {
  try {
    const response = await axios.get(baseUrl + "/address", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.status || error.message;
  }
};

export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(baseUrl + "/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.status || error.message;
  }
};

export const deleteUserAddress = async (id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/address/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the server response
  } catch (error) {
    throw error.response?.status || error.message; // Handle errors
  }
};

export const updateUserAddress = async (token, addressId, addressData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/address/update/${addressId}`,
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getMonthlyFlashSaleProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/month-flash-sale", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getDealsofMonthProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/deal-of-month", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getBestBrandedProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/best-brand", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getBestTopNewArrivalTabProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/product-tops", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getBestCategoryProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/best-category", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getSliders = async () => {
  try {
    const res = await axios.get(baseUrl + "/sliders", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getPromotions = async () => {
  try {
    const res = await axios.get(baseUrl + "/promotions", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getTrendingProduct = async () => {
  try {
    const res = await axios.get(baseUrl + "/trent-product", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const fetchProducts = async (categoryId) => {
  try {
    const res = await axios.get(
      baseUrl +
        `/products/by-category?items=&category=${categoryId}&sub_category=`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(baseUrl + `/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const quickSearch = async (term) => {
  let controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await axios.post(
      baseUrl + "/product-search",
      { term },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
      console.error("Request failed", error);
    }
    throw error;
  }
};

export const createUserAddress = async (userAddressData, token) => {
  try {
    const res = await axios.post(baseUrl + "/address/create", userAddressData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const subscribeToNewsApi = async (username) => {
  try {
    const response = await axios.post(
      "https://ecom-test2.yalpos.com/api/newsletter",
      { email: username },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.status;
    } else {
      throw error;
    }
  }
};

export const fetchSystemData = async (id) => {
  try {
    const res = await axios.get(baseUrl + `/settings`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getBrandLogos = async (id) => {
  try {
    const res = await axios.get(baseUrl + `/brands`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  phone,
  password
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/register`,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        password_confirmation: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const verifyOtp = async (email, activationCode) => {
  try {
    const response = await axios.post(
      `${baseUrl}/otp-verification`,
      {
        email: email,
        activation_code: activationCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseUrl}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const sendResetLink = async (email) => {
  try {
    const response = await axios.post(
      `${baseUrl}/forgot-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const updatePassword = async (code, email, password) => {
  try {
    const response = await axios.put(
      `${baseUrl}/reset-password`,
      {
        code: code,
        email: email,
        password: password,
        password_confirmation: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getCartDetails = async () => {
  try {
    const userStr = localStorage.getItem("user");
    let response;

    if (userStr) {
      const token = JSON.parse(userStr).token;
      response = await axios.get(`${baseUrl}/get-cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const ip_address = await getIPAddress();
      response = await axios.get(`${baseUrl}/card-details`, {
        params: {
          ip_address,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const addToCart = async (token, cartItem) => {
  try {
    const response = await axios.post(
      baseUrl + "/api/add-card",
      {
        products: [
          {
            product_id: cartItem.product_id,
            discount: cartItem.discount || "",
            quantity: cartItem.quantity || "1",
            line_discount_type: cartItem.line_discount_type || "",
            variant_id: cartItem.variant_id,
            unit_price: cartItem.unit_price,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

export const addToCartGuest = async (cartItem) => {
  try {
    const ip_address = await getIPAddress();

    const response = await axios.post(
      baseUrl + "/add-card",
      {
        ip_address,
        products: [
          {
            product_id: cartItem.product_id,
            variant_id: cartItem.variant_id,
            quantity: cartItem.quantity || "1",
            unit_price: cartItem.unit_price,
            discount: cartItem.discount || "",
            line_discount_type: cartItem.line_discount_type || "",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add to cart guest error:", error);
    throw error;
  }
};

export const deleteCartItem = async (cardId) => {
  try {
    const userStr = localStorage.getItem("user");
    let response;

    if (userStr) {
      const token = JSON.parse(userStr).token;
      response = await axios.delete(`${baseUrl}/card/remove/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      const ip_address = await getIPAddress();
      response = await axios.delete(`${baseUrl}/card/remove/${cardId}`, {
        params: { ip_address },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return response.data;
  } catch (error) {
    console.error("Delete cart item error:", error);
    throw error;
  }
};

export const clearCart = async (token, ipAddress) => {
  try {
    let response;

    if (token) {
      response = await axios.post(
        `${baseUrl}/card-clear`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (ipAddress) {
      const ip = await getIPAddress();
      response = await axios.post(
        `${baseUrl}/card/clear`,
        { ip_address: ip },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      throw new Error("Token or IP address is required to clear the cart.");
    }
    return response.data;
  } catch (error) {
    console.error("Clear cart API error:", error.response || error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateCartItem = async (cartItem) => {
  try {
    const userStr = localStorage.getItem("user");

    const cartResponse = await getCartDetails();
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return response.data;
  } catch (error) {
    console.error("Update cart item error:", error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${baseUrl}/countries`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const addToWishlist = async (productId) => {
  try {
    const userStr = localStorage.getItem("user");
    let response;

    if (userStr) {
      const token = JSON.parse(userStr).token;
      response = await axios.post(
        `${baseUrl}/wishlists/add`,
        { product_id: productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      throw new Error("User is not authenticated");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const getWishListofUser = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      throw new Error("User is not authenticated");
    }

    const token = JSON.parse(userStr).token;
    const response = await axios.get(`${baseUrl}/wishlists/view`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      console.error("Expected an array but got:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const deleteWishlistItem = async (wishlist_id) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new Error("User is not authenticated");
  }
  const token = JSON.parse(userStr).token;

  try {
    const response = await axios.delete(
      `${baseUrl}/wishlists/remove/${wishlist_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCities = async (countryId) => {
  try {
    const response = await axios.get(`${baseUrl}/cities`, {
      params: { country_id: countryId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getShippingCharge = async (cityId) => {
  try {
    const response = await axios.get(`${baseUrl}/get-shiping-charge`, {
      params: { city_id: cityId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPaymentTypes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/payment-types`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const userStr = localStorage.getItem("user");
    const formattedOrderData = {
      final_total: orderData.final_total,
      note: orderData.note || "Order from website",
      shipping_charge: orderData.shipping_charge || 0,
      coupon_id: orderData.coupon_id,
      coupon_type: orderData.coupon_type,
      coupon_value: orderData.coupon_value,
      country: orderData.country,
      address: orderData.address,
      city: orderData.city,
      first_name: orderData.first_name,
      last_name: orderData.last_name || "",
      apartment: orderData.apartment || "",
      email: orderData.email || "",
      phone: orderData.phone || "",
      state: orderData.state || "",
      postal_code: orderData.postal_code || "",
      products: orderData.products.map((product) => ({
        line_id: product.line_id,
        discount: product.discount || "",
        quantity: product.quantity,
      })),
    };

    let response;
    if (userStr) {
      const { token } = JSON.parse(userStr);
      response = await axios.post(
        `${baseUrl}/user/place-order`,
        formattedOrderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      const ip_address = await getIPAddress();
      response = await axios.post(
        `${baseUrl}/guest/order`,
        {
          ...formattedOrderData,
          ip_address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    console.log(JSON.stringify(response.data) + "API order");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const validateCoupon = async (code) => {
  try {
    const response = await axios.get(`${baseUrl}/get-coupon`, {
      params: { code },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${baseUrl}/currencies`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await axios.get(`${baseUrl}/languages`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAboutUs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/about-us`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFaqs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/faqs`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getTermsCondition = async () => {
  try {
    const response = await axios.get(`${baseUrl}/terms-condition`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPrivacyPolicy = async () => {
  try {
    const response = await axios.get(`${baseUrl}/privacy-policy`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getShippingCondition = async () => {
  try {
    const response = await axios.get(`${baseUrl}/shiping-condition`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/contact-us`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};