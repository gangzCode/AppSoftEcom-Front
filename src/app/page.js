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
      {settings.is_show_deal_promotion === 1 && <SpecialDayOfferSale/>}
      {/* {settings.is_show_best_sales === 1 && <BestSeller />} */}
      {settings.is_show_day_flash_sale === 1 && <DayFlashSale/>}
      {settings.is_show_deal_day_sale === 1 &&<DealsofDay />}
      {settings.is_show_deal_promotion === 1 && <DealsBetweenBanner />}
      {settings.is_show_month_flash_sale === 1 && <MonthlyFlashSale/>}
      {settings.is_show_deal_month_sale === 1 &&<DealsofMonth/>}
      {settings.is_show_top_promotion === 1 && <TopSellingBetweenBanner />}
      {settings.is_show_best_category === 1 && <BestCategory />}
      {settings.is_show_best_brand_product === 1 && <BestBrand />}
      {settings.is_show_category_promotion === 1 && <CategoryBetweenBanner />}
      {settings.is_show_best_sales === 1 && <TabSection />}
      {<Brands />}
      <InfoSection />
      <Newsletter />
    </>
  );
};

export default HomePage;
