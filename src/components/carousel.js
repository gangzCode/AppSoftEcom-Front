import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
      image: "https://placehold.co/1200x600?text=Slide+2",
      buttonLink: "#",
    },
    {
      title: "Special Offers",
      description: "Save big on our exclusive deals.",
      image: "https://placehold.co/1200x600?text=Slide+3",
      buttonLink: "#",
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
    autoplay: true,
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
                alignItems: "center",
                justifyContent: "flex-start",
                color: "#fff",
                padding: "2em",
              }}
            >
              <Box sx={{ justifyItems: "flex-start", padding: "20px", marginLeft: "20px" }}> {/* Adjust marginLeft here */}
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
                <Typography color={"#1e1e1e"} fontSize={"12px"}>
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  href={slide.buttonLink}
                  sx={{ marginTop: "20px" }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarouselSection;