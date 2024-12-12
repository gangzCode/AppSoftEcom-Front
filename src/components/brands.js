import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { getBrandLogos } from "../services/apiCalls";

const Brands = () => {
  const [brandImages, setBrandImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brands = await getBrandLogos();
        setBrandImages(brands);
      } catch (error) {
        console.error("Error fetching brand logos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "slide 10s linear infinite",
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {brandImages.map((brand) => (
          <Box
            key={`${brand.id}-1`}
            component="img"
            src={brand.image}
            alt={brand.name?.En || `Brand ${brand.id}`}
            sx={{
              width: "auto",
              height: "100px",
              objectFit: "contain",
              padding: "10px",
              display: "inline-block",
            }}
          />
        ))}
        {brandImages.map((brand) => (
          <Box
            key={`${brand.id}-2`}
            component="img"
            src={brand.image}
            alt={brand.name?.En || `Brand ${brand.id}`}
            sx={{
              width: "auto",
              height: "100px",
              objectFit: "contain",
              padding: "10px",
              display: "inline-block",
            }}
          />
        ))}
      </Box>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Container>
  );
};

export default Brands;
