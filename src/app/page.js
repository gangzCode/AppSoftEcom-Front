import React from "react";
import CarouselComp from "../components/carousel";
import ShopNow from "../components/shopNow";
import BestSeller from "../components/bestSeller";
import BestSeller2 from "../components/bestSeller2";
import Deals from "../components/deals";
import TabSection from "../components/tabsSection";
import Brands from "../components/brands";
import Newsletter from "../components/newsLetter";
import InfoSection from "../components/infoSection";
import PromoSection from "../components/promoSection";
const HomePage = () => {
  return (
    <>
      <CarouselComp />
      <ShopNow />
      <BestSeller />
      <BestSeller2 />
      <Deals />
      <PromoSection />
      <TabSection />
      <BestSeller />
      <InfoSection />
      <Brands />
      <Newsletter />
    </>
  );
};

export default HomePage;
