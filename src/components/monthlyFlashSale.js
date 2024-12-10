import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, ShoppingCart, Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getMonthlyFlashSaleProducts } from "../services/apiCalls";
import { Container } from "../common/Spacing";
import ProductCard from "./ProductCard";

const MonthlyFlashSale = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]); // Ensure products is an array
  const [title, setTitle] = useState("Default Title"); // Initialize with default
  const [subTitle, setSubTitle] = useState("Default Subtitle");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getMonthlyFlashSaleProducts();
        setTitle(response?.title || "Default Title");
        setSubTitle(response?.sub_title || "Default Subtitle");
        setProducts(response?.data || []); // Fallback to empty array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Handle API failure gracefully
      }
    };

    fetchProducts();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    },
    onSwipedRight: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container>
      <Typography
        variant="p"
        fontSize={"12px"}
        color={"#1e1e1e"}
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            marginLeft: "1em",
            transform: "translateY(-50%)",
            width: "150px",
            height: "2px",
            backgroundColor: "#2189ff",
          },
        }}
      >
        {subTitle}
      </Typography>
      <Typography variant="h4" fontWeight={"600"} component="h2" gutterBottom>
        {title}
      </Typography>
      <Box
        {...handlers}
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 3,
          padding: 2,
          scrollBehavior: "smooth",
          paddingBottom: "50px",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2189ff",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ccc",
          },
        }}
      >
        {products.length > 0 && products !== null ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <Typography variant="body1">No products available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default MonthlyFlashSale;
