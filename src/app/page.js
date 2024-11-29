import React, { useEffect, useState } from "react";
import CarouselComp from "../components/carousel";
import HomeBetweenBanner from "../components/homeBetweenBanner";
import BestSeller from "../components/bestSeller";
import DealsBetweenBanner from "../components/dealsBetweenBanner";
import DealsofDay from "../components/dealsodDay";
import TabSection from "../components/tabsSection";
import Brands from "../components/brands";
import Newsletter from "../components/newsLetter";
import InfoSection from "../components/infoSection";
import BestBrand from "../components/bestBrand";
import TopSellingBetweenBanner from "../components/topSellingBetweenBanner";
import CategoryBetweenBanner from "../components/categoryBetweenBanner";
import BestCategory from "../components/bestCategory";
import { fetchSystemData } from "../services/apiCalls";
import DayFlashSale from "../components/dayFlashSale";
import SpecialDayOfferSale from "../components/specialDayOfferSale";
import MonthlyFlashSale from "../components/monthlyFlashSale";
import DealsofMonth from "../components/dealsofMonth";

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
      <DayFlashSale/>
      {settings.is_show_deal_promotion === 1 && <DealsBetweenBanner />}
      <SpecialDayOfferSale/>
      {<DealsofDay />}
      {settings.is_show_top_promotion === 1 && <TopSellingBetweenBanner />}
      <MonthlyFlashSale/>
      {settings.is_show_best_sales === 1 && <TabSection />}
      <DealsofMonth/>
      {settings.is_show_best_brand_product === 1 && <BestBrand />}
      {settings.is_show_category_promotion === 1 && <CategoryBetweenBanner />}
      { <BestCategory />}
      <InfoSection />
      {<Brands />}
      <Newsletter />
    </>
  );
};

export default HomePage;
