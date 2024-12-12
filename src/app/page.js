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
import { Box, Typography, CircularProgress } from "@mui/material";
import ScrollTransition from "../common/ScrollTransition";

const HomePage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await fetchSystemData();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Home Page...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ScrollTransition>
        {settings.is_show_home_slider === 1 && <CarouselComp />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_home_promotion === 1 && <HomeBetweenBanner />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_offer_sale === 1 && <SpecialDayOfferSale />}
      </ScrollTransition>

      {/* Apply ScrollTransition to remaining sections */}
      <ScrollTransition>
        {settings.is_show_day_flash_sale === 1 && <DayFlashSale />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_deal_day_sale === 1 && <DealsofDay />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_deal_promotion === 1 && <DealsBetweenBanner />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_month_flash_sale === 1 && <MonthlyFlashSale />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_deal_month_sale === 1 && <DealsofMonth />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_top_promotion === 1 && <TopSellingBetweenBanner />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_best_category === 1 && <BestCategory />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_best_brand_product === 1 && <BestBrand />}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_category_promotion === 1 && <CategoryBetweenBanner />}
      </ScrollTransition>

      <ScrollTransition>
        <TabSection />
      </ScrollTransition>

      <ScrollTransition>
        <Brands />
      </ScrollTransition>

      <ScrollTransition>
        <InfoSection />
      </ScrollTransition>

      <ScrollTransition>
        <Newsletter />
      </ScrollTransition>
    </>
  );
};

export default HomePage;
