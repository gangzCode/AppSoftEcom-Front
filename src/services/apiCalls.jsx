const baseUrl = "https://ecom-test2.yalpos.com/api";

export const getCategoriesForAllCategoriesDrop = async () => {
    const res = await fetch(baseUrl + "/all-categories", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (!res.ok) {
      throw res.status;
    }
    return await res.json();
};