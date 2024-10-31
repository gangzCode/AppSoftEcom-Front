import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import { ImportContactsOutlined, NextPlanRounded } from "@mui/icons-material";

const CarouselSection = () => {
  const slides = [
    {
      title: "Welcome to Our Shop",
      description: "Discover the best products at unbeatable prices.",
      image: "https://placehold.co/1200x600?text=Slide+1",
      buttonLink: "#",
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection now.",
      image: "https://placehold.co/1200x600?text=Slide+1",
      buttonLink: "#",
    },
    {
      title: "Special Offers",
      description: "Save big on our exclusive deals.",
      image: "https://placehold.co/1200x600?text=Slide+1",
      buttonLink: "#",
    },
  ];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden", paddingBottom: "20px" }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              height: "500px",
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex !important",
              borderRadius: "16px",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "#fff",
              // textAlign: "center",
              padding: "2em",

              "& .slick-prev": {
                left: "3% !important",
                zIndex: "1",
              },
            }}
          >
            <Box
              sx={{
                justifyItems: "flex-start",
                // backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="p"
                fontSize={"12px"}
                color={"#1e1e1e"}
                sx={{
                  position: "relative",
                  // paddingRight: "20px",
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
                COMPUTER ACCESSORIES
              </Typography>
              <Typography
                color={"#1e1e1e"}
                fontWeight={"600"}
                variant="h4"
                gutterBottom
              >
                {slide.title}
              </Typography>
              <Typography color={"#1e1e1e"} variant="body1" gutterBottom>
                {slide.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={slide.buttonLink}
                sx={{ borderRadius: "10px", marginTop: "10px" }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselSection;
