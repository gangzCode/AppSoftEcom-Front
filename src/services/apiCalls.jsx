import axios from "axios";

const baseUrl = "https://ecom-test2.yalpos.com/api";

export const getCategoriesForAllCategoriesDrop = async () => {
  try {
    const res = await axios.get(baseUrl + "/all-categories", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getFeaturesProducts = async () => {
  try {
    const res = await axios.get(baseUrl + "/products", {
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
