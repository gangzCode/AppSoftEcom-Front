import React, { useEffect, useState } from "react";
import CarouselComp from "../components/carousel";
import HomeBetweenBanner from "../components/homeBetweenBanner";
import BestSeller from "../components/bestSeller";
import DealsBetweenBanner from "../components/dealsBetweenBanner";
import Deals from "../components/deals";
import TabSection from "../components/tabsSection";
import Brands from "../components/brands";
import Newsletter from "../components/newsLetter";
import InfoSection from "../components/infoSection";
import BestBrand from "../components/bestBrand";
import TopSellingBetweenBanner from "../components/topSellingBetweenBanner";
import CategoryBetweenBanner from "../components/categoryBetweenBanner";
import BestCategory from "../components/bestCategory";
import { fetchSystemData } from "../services/apiCalls";

const HomePage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await fetchSystemData(); // Call the API function
        setSettings(data); // Store the settings data
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <>
      {settings.is_show_home_slider === 1 && <CarouselComp />}
      {settings.is_show_home_promotion === 1 && <HomeBetweenBanner />}
      {settings.is_show_top_selling === 1 && <BestSeller />}
      {settings.is_show_deal_promotion === 1 && <DealsBetweenBanner />}
      {settings.is_show_day_flash_sale === 1 && <Deals />}
      {settings.is_show_top_promotion === 1 && <TopSellingBetweenBanner />}
      {settings.is_show_best_sales === 1 && <TabSection />}
      {settings.is_show_best_brand_product === 1 && <BestBrand />}
      {settings.is_show_category_promotion === 1 && <CategoryBetweenBanner />}
      {settings.is_show_best_category === 1 && <BestCategory />}
      <InfoSection />
      {settings.is_show_best_brand_product === 1 && <Brands />}
      <Newsletter />
    </>
  );
};

export default HomePage;