import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
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
    <Box sx={{ padding: "4em 0" }}>
      <Grid container spacing={2} justifyContent="space-between">
        {brandImages.slice(0, 5).map((brand) => (
          <Grid item key={brand.id} xs={2}>
            <Box
              component="img"
              src={brand.image}
              alt={brand.name?.En || `Brand ${brand.id}`}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                padding: "10px",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Brands;