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
import { fetchSystemData,getBestBrandedProducts, getBestCategoryProducts } from "../services/apiCalls";
import DayFlashSale from "../components/dayFlashSale";
import SpecialDayOfferSale from "../components/specialDayOfferSale";
import MonthlyFlashSale from "../components/monthlyFlashSale";
import DealsofMonth from "../components/dealsofMonth";
import { Box, Typography, CircularProgress } from "@mui/material";
import ScrollTransition from "../common/ScrollTransition";

const HomePage = () => {
  const [settings, setSettings] = useState(null);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBestBrandedProducts();

        const products = response?.data?.map((brand) => ({
          title: brand.title,
          subTitle: brand.sub_title, 
          products: brand.data,
        })) || [];

        const filteredProducts = response?.data?.map((brand) => ({
          title: brand.title,
          subTitle: brand.sub_title,
          products: brand.data?.filter((product) => product.top_status === 1) || [],
        })) || [];

        setFilteredProducts(
          filteredProducts
        );
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await getBestCategoryProducts();

        const categories = response?.data?.map((category) => ({
          title: category.title,
          subTitle: category.sub_title,
          products: category.data,
        })) || [];

        const filteredCategories = response?.data?.map((category) => ({
          title: category.title,
          subTitle: category.sub_title,
          products: category.data?.filter((product) => product.top_status === 1) || [],
        })) || [];

        setFilteredCategoryProducts(filteredCategories);
        setCategoryProducts(categories);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setFilteredCategoryProducts([]);
        setCategoryProducts([]);
      }
    };

    fetchCategoryProducts();
  }, []);


  if (!settings) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx={{
          background: "linear-gradient(145deg, #ffffff 0%, #ffffff 100%)",
          animation: "fadeIn 0.8s ease-in-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        <CircularProgress
          size={70}
          thickness={4}
          sx={{
            color: "#2189ff",
            animation: "pulse 1.5s ease-in-out infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 1 },
              "50%": { transform: "scale(1.1)", opacity: 0.7 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontWeight: 500,
            color: "black",
            animation: "wave 2s ease-in-out infinite",
            "@keyframes wave": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-5px)" },
            },
          }}
        >
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
        {settings.is_show_best_category === 1 &&
          filteredCategoryProducts?.map((category) => (
            <BestCategory
              key={category.title}
              title={category.title}
              subTitle={category.subTitle}
              products={categoryProducts.find((p) => p.title === category.title)?.products || []}
              filteredProducts={category.products}
            />
          ))}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_best_brand_product === 1 && filteredProducts?.map((brand) => (
          <BestBrand
            key={brand.title}
            title={brand.title}
            subTitle={brand.subTitle} 
            products={products.find((p) => p.title === brand.title)?.products || []}
            filteredProducts={brand.products}
          />
        ))}
      </ScrollTransition>

      <ScrollTransition>
        {settings.is_show_category_promotion === 1 && <CategoryBetweenBanner />}
      </ScrollTransition>

      <ScrollTransition>
        {(settings?.is_show_top_selling === 1 || 
          settings?.is_show_best_sales === 1 || 
          settings?.is_show_new_arrivals === 1) && <TabSection />}
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
