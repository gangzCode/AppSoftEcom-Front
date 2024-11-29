import React, { useEffect } from "react";
import { fetchSystemData } from "../services/apiCalls"; // Assume this fetches your data

const DynamicFavicon = () => {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const response = await fetchSystemData();

        const faviconUrl = response.favicon;
        const websiteTitle = response.name;

        if (faviconUrl) {
          const link = document.querySelector("link[rel='icon']") || document.createElement("link");
          link.rel = "icon";
          link.href = faviconUrl;
          document.head.appendChild(link);
        }

        document.title = websiteTitle;

      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    };

    updateFavicon();
  }, []);

  return null;
};

export default DynamicFavicon;