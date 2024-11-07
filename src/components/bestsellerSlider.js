import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  ChevronRight,
  Favorite,
  Layers,
  Search,
  ShoppingCart,
} from "@mui/icons-material";

const BestsellerSlider = () => {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
      description: "Product 1",
    },
    {
      id: 2,
      title: "Product 2",
      price: 59.99,
      image: "https://placehold.co/380x360",
      available: false,
      category: "Category B",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+2",
      description: "Product 2",
    },
    {
      id: 3,
      title: "Product 3",
      price: 19.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
    },
    {
      id: 4,
      title: "Product 4",
      price: 29.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
    },
    {
      id: 5,
      title: "Product 5",
      price: 59.99,
      image: "https://placehold.co/380x360",
      available: false,
      category: "Category B",
    },
    {
      id: 6,
      title: "Product 6",
      price: 19.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
    },
    {
      id: 7,
      title: "Product 7",
      price: 29.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
    },
    {
      id: 8,
      title: "Product 8",
      price: 59.99,
      image: "https://placehold.co/380x360",
      available: false,
      category: "Category B",
    },
    {
      id: 9,
      title: "Product 9",
      price: 19.99,
      image: "https://placehold.co/380x360",
      available: true,
      category: "Category A",
    },
  ];

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "#007bff",
          borderRadius: "8px",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity 0.3s",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
          zIndex: 1000,
        }}
        className="slick-arrow"
      >
        <ArrowForwardIosIcon sx={{ color: "#fff", fontSize: "20px" }} />
      </Box>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "#007bff",
          borderRadius: "8px",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity 0.3s",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
          zIndex: 1000,
        }}
        className="slick-arrow"
      >
        <ArrowBackIosNewIcon sx={{ color: "#fff", fontSize: "20px" }} />
      </Box>
    );
  }

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        paddingBottom: "20px",
        position: "relative",
        height: "500px",
        "& .slick-arrow": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography
            fontSize={"20px"}
            fontWeight={"600"}
            color={"#1e1e1e"}
            textAlign="left"
            sx={{ marginBottom: "8px", padding: "1.5em 1em" }}
          >
            Best Seller
          </Typography>

          <Slider {...settings}>
            {products.map((product, index) => (
              <Box
                key={product.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  minWidth: "280px",
                  width: "31%",
                  padding: "60px",
                  borderRadius: "20px",
                  backgroundColor: "#f5f5f5",
                  // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  ":hover": {
                    // boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "360px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
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
                    src={product.hoverImage}
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
                  textAlign="left"
                  sx={{ letterSpacing: "1px", marginBottom: "8px" }}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  textAlign="left"
                  sx={{ marginBottom: "8px" }}
                >
                  {product.description}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="left"
                  sx={{ marginTop: "auto" }}
                >
                  <Typography variant="h6" fontWeight="600">
                    ${product.price}
                  </Typography>
                  <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default BestsellerSlider;
