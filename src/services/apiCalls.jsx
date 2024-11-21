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

// export const fetchProducts = async () => {
//   const response = await axiosInstance.get("/products");

//   console.log(response.data + " API");

//   return response.data;
// };

// export const fetchProductById = async (productId) => {
//   const response = await axiosInstance.get(`/products/${productId}`);
//   return response.data;
// };
