const baseUrl = process.env.PUBLIC_BASE_URL;

export const getCategoriesForAllCategoriesDrop = async () => {
    const res = await fetch(baseUrl + `/all-categories`, {
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