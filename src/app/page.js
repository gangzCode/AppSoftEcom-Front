import React from "react";
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

const HomePage = () => {
  return (
    <>
      <CarouselComp />
      <HomeBetweenBanner />
      <BestSeller />
      <DealsBetweenBanner />
      <Deals />
      <TopSellingBetweenBanner />
      <TabSection />
      <BestBrand />
      <CategoryBetweenBanner/>
      <BestCategory/>
      <InfoSection />
      <Brands />
      <Newsletter />
    </>
  );
};

export default HomePage;
