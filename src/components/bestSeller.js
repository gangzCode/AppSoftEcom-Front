import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronRight } from "@mui/icons-material";

const BestSeller = () => {
  const scrollContainerRef = useRef(null);

  const products = [
    {
      id: 1,
      image:
        "https://dt-elektrix.myshopify.com/cdn/shop/products/Electro07.jpg?v=1666157970&width=360",
      description: "Product 1",
      price: "$19.99",
    },
    {
      id: 2,
      image: "https://placehold.co/360x340",
      description: "Product 2",
      price: "$29.99",
    },
    {
      id: 3,
      image: "https://placehold.co/360x340",
      description: "Product 3",
      price: "$39.99",
    },
    {
      id: 4,
      image: "https://placehold.co/360x340",
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://placehold.co/360x340",
      description: "Product 5",
      price: "$59.99",
    },
    {
      id: 4,
      image: "https://placehold.co/360x340",
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://placehold.co/360x340",
      description: "Product 5",
      price: "$59.99",
    },
    {
      id: 4,
      image: "https://placehold.co/360x340",
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://placehold.co/360x340",
      description: "Product 5",
      price: "$59.99",
    },
  ];

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
    <Box sx={{ padding: "40px 0" }}>
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
        Our Best Selling Products
      </Typography>
      <Box
        {...handlers} // Attach swipe handlers
        ref={scrollContainerRef} // Attach ref for scrolling
        sx={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping
          gap: 3, // Space between products
          padding: 2, // Padding for the entire section
          scrollbarColor: "#2189ff #ccc", // Custom scrollbar color
          scrollbarWidth: "thin", // Thin scrollbar for Firefox
          scrollBehavior: "smooth",
          paddingBottom: "50px",
          "&::-webkit-scrollbar": {
            height: "8px", // Custom height for the horizontal scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2189ff", // Thumb (scrolling element) color
            borderRadius: "10px", // Rounded corners for thumb
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ccc", // Background color of the scrollbar track
          },
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "inline-block",
              minWidth: "300px",
              padding: "16px",
              borderRadius: "10px",
              backgroundColor: "#f3f3f3",
              transition: "all 0.3s linear",
              cursor: "pointer",
              ":hover": {
                boxShadow: "3.536px 3.536px 10px 0px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {/* Product Image */}
            <Box
              component="img"
              src={product.image}
              alt={product.description}
              sx={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Typography variant="p" fontSize={"12px"} color={"#bebebe"}>
              HOTDEALS
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Box flexDirection={"row"}>
              <Typography variant="h6" fontWeight={"600"} mt={1}>
                {product.price}
              </Typography>
              <ChevronRight />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BestSeller;
