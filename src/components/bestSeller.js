import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useSwipeable } from "react-swipeable";

const BestSeller = () => {
  const scrollContainerRef = useRef(null);

  // Array of product data
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 1",
      price: "$19.99",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 2",
      price: "$29.99",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 3",
      price: "$39.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 5",
      price: "$59.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 5",
      price: "$59.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/200x200", // Replace with your product image URL
      description: "Product 5",
      price: "$59.99",
    },
  ];

  // Swipe handlers to scroll left or right
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" }); // Swipe left scrolls right
      }
    },
    onSwipedRight: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" }); // Swipe right scrolls left
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable swipe detection via mouse drag for desktop users
  });

  return (
    <Box sx={{ padding: "40px" }}>
      {/* Title and Subtitle */}
      <Typography
        variant="subtitle1"
        component="p"
        color="textSecondary"
        gutterBottom
      >
        HOTDEALS
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Our Best Selling Products
      </Typography>
      <Box
        {...handlers} // Attach swipe handlers
        ref={scrollContainerRef} // Attach ref for scrolling
        sx={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping
          gap: 2, // Space between products
          padding: 2, // Padding for the entire section
          scrollbarColor: "#888 #ccc", // Custom scrollbar color
          scrollbarWidth: "thin", // Thin scrollbar for Firefox
          "&::-webkit-scrollbar": {
            height: "8px", // Custom height for the horizontal scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Thumb (scrolling element) color
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
              display: "inline-block", // Ensure each product stays on a single line
              minWidth: "200px", // Width of each product card
              textAlign: "center",
              padding: 2,
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            {/* Product Image */}
            <Box
              component="img"
              src={product.image}
              alt={product.description}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {/* Product Description */}
            <Typography variant="body1" mt={2}>
              {product.description}
            </Typography>
            {/* Product Price */}
            <Typography variant="h6" color="primary" mt={1}>
              {product.price}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BestSeller;
