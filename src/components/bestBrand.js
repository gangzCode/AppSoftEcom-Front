import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import {
  ChevronRight,
  ShoppingCart,
  Favorite,
  Search,
  Layers,
} from "@mui/icons-material";
import { getBestBrandedProducts } from "../services/apiCalls";

const BestBrand = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setproducts] = useState("");

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const response = await getBestBrandedProducts();
        setproducts(response.data);
        console.log("Products Best Branded", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchGetProducts();
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
    <Box sx={{ padding: "40px 0", margin: "2em 0" }}>
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
        HOTDEALS
      </Typography>
      <Typography variant="h4" fontWeight={"600"} component="h2" gutterBottom>
        Best Branded Products
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
        {products !== undefined &&
          products.length > 0 &&
          products.slice(0, 8).map((product) => (
            <Box
              key={product.id}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minWidth: "280px",
                padding: "20px",
                borderRadius: "20px",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                ":hover": {
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                },
              }}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "240px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={product.image || "https://placehold.co/360x340"}
                  alt={product.description}
                  sx={{
                    width: "100%",
                    height: "auto",
                    transition: "opacity 0.5s ease",
                    opacity: hoveredProductId === product.id ? 0 : 1,
                  }}
                />
                <Box
                  component="img"
                  src={
                    product.hoverImage ||
                    "https://placehold.co/360x340?text=Hover+Image"
                  }
                  alt={product.description}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "auto",
                    transition: "opacity 0.5s ease",
                    opacity: hoveredProductId === product.id ? 1 : 0,
                  }}
                />
              </Box>

              <Box
                className="hover-icons"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  gap: "8px",
                  opacity: hoveredProductId === product.id ? 1 : 0,
                  visibility:
                    hoveredProductId === product.id ? "visible" : "hidden",
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              >
                {[
                  { icon: <ShoppingCart />, id: "cart" },
                  { icon: <Layers />, id: "layers" },
                  { icon: <Favorite />, id: "favorite" },
                  { icon: <Search />, id: "search" },
                ].map((item) => (
                  <IconButton
                    key={item.id}
                    sx={{
                      backgroundColor: "#2189ff",
                      color: "#fff",
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      "&:hover": {
                        backgroundColor: "#000",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Box>
              <Typography
                variant="caption"
                fontSize={"12px"}
                color={"#bebebe"}
                sx={{ letterSpacing: "1px", marginBottom: "3x" }}
              >
                {product.category_name}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="400"
                sx={{ marginBottom: "8px" }}
              >
                {product.name.substr(0, 20)}
              </Typography>
              <Box
                display={"flex"}
                justifyContent="space-between"
                sx={{ marginTop: "auto" }}
              >
                <Typography variant="h6" fontSize={"22px"} fontWeight="600">
                  {product.price || "$0"}
                </Typography>
                <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default BestBrand;
