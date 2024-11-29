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

export const getBestSellingProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/products/best-sale?items=2", {
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
    const res = await axios.get(
      baseUrl + "/products?items=&language=&currency=",
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
