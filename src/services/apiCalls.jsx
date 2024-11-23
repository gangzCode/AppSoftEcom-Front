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
    let controller = new AbortController();  // Local controller to avoid using a global variable
    const signal = controller.signal;
  
    try {
      const res = await fetch("https://ecom-test2.yalpos.com/api/product-search", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",  // Use POST since we're sending a request body
        signal: signal,
        body: JSON.stringify({ term }),  // Send the term in the request body
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      // Handle specific errors (e.g., aborted requests)
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Request failed', error);
      }
      throw error;
    }
  };
  
