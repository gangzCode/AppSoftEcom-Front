import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const baseUrl = "https://ecom-test2.yalpos.com/api";

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
    console.log(res.data);

    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const updateUserProfile = async (userData, token) => {
  try {
    console.log("Sending token in request:", token);
    const res = await axios.put(baseUrl + "/profile/update", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
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
    const res = await axios.get(baseUrl + "/products/best-brand?items=2", {
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
    console.log(res.data + " API");
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
    console.log(res + "res api");

    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const quickSearch = async (term) => {
  let controller = new AbortController(); // Local controller to avoid using a global variable
  const signal = controller.signal;

  try {
    const response = await axios.post(
      "https://ecom-test2.yalpos.com/api/product-search",
      { term },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      }
    );

    return response.data; // Return the response data directly
  } catch (error) {
    // Handle specific errors (e.g., aborted requests)
    if (axios.isCancel(error)) {
      console.log("Request was aborted");
    } else {
      console.error("Request failed", error);
    }
    throw error;
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
    return response.data; // Return the response data directly
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
    console.log(res + "res api");

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
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios.get(`${baseUrl}/card-details`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const addToCart = async (cartItem) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://ecom-test2.yalpos.com/api/add-card",
      {
        products: [
          {
            product_id: cartItem.product_id,
            discount: cartItem.discount || "",
            quantity: cartItem.quantity || "1",
            line_discount_type: "percentage",
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
