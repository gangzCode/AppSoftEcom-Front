import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getSliders } from "../services/apiCalls";

const CarouselSection = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await getSliders();
        const sortedSlides = response.data.sort((a, b) => a.order - b.order);
        setSlides(sortedSlides);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    if (slides.length === 0) {
      fetchFeaturedProducts();
    }
  }, [slides]);

  const SampleNextArrow = (props) => {
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
  };

  const SamplePrevArrow = (props) => {
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
  };

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        paddingBottom: "5em",
        position: "relative",
        height: { xs: "200px", md: "500px" },
        "&:hover .slick-arrow": {
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
        <Slider {...settings}>
          {slides.length > 0 &&
            slides.map((slide) => (
              <Box
                key={slide.id}
                component={slide.link ? "a" : "div"}
                href={slide.link || undefined}
                target={slide.link ? "_blank" : undefined}
                rel={slide.link ? "noopener noreferrer" : undefined}
                sx={{
                  height: { xs: "140px", md: "500px" },
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "2em",
                  borderRadius: "16px", // Maintain curvy edges
                  overflow: "hidden",
                  
                }}
              ></Box>
            ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarouselSection;
