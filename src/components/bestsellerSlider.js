import React, { useEffect, useState } from "react";
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
import { getBestSellingProducts } from "../services/apiCalls";
import { Link } from "react-router-dom";

const BestsellerSlider = () => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const response = await getBestSellingProducts();
        setproducts(response.data);
        console.log("Products Best selling", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchGetProducts();
  }, []);

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
          right: { xs: "5px", sm: "10px" },
          transform: "translateY(-50%)",
          backgroundColor: "#007bff",
          borderRadius: "8px",
          width: { xs: "35px", sm: "40px" },
          height: { xs: "35px", sm: "40px" },
          cursor: "pointer",
          opacity: { xs: 1, sm: 0 },
          transition: "opacity 0.3s",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
          zIndex: 1000,
        }}
        className="slick-arrow"
      >
        <ArrowForwardIosIcon sx={{ 
          color: "#fff", 
          fontSize: { xs: "16px", sm: "20px" } 
        }} />
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
          left: { xs: "5px", sm: "10px" },
          transform: "translateY(-50%)",
          backgroundColor: "#007bff",
          borderRadius: "8px",
          width: { xs: "35px", sm: "40px" },
          height: { xs: "35px", sm: "40px" },
          cursor: "pointer",
          opacity: { xs: 1, sm: 0 },
          transition: "opacity 0.3s",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
          zIndex: 1000,
        }}
        className="slick-arrow"
      >
        <ArrowBackIosNewIcon sx={{ 
          color: "#fff", 
          fontSize: { xs: "16px", sm: "20px" } 
        }} />
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
              <Link href={`/product/${product.id}`} key={product.id}>
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
                      { icon: <Favorite />, id: "favorite" },
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
                    {product.category_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    textAlign="left"
                    sx={{
                      marginBottom: "8px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: "1.2em",
                      maxHeight: "2.4em",
                    }}
                  >
                    {product.name}
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
                    <ChevronRight
                      sx={{ color: "#2189ff", marginLeft: "8px" }}
                    />
                  </Box>
                </Box>
              </Link>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default BestsellerSlider;
