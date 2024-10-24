import React from "react";
import { Box, Grid } from "@mui/material";

const Brands = () => {
  // Sample brand image URLs
  const brandImages = [
    "https://placehold.co/200x50",
    "https://placehold.co/200x50",
    "https://placehold.co/200x50",
    "https://placehold.co/200x50",
    "https://placehold.co/200x50",
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        {brandImages.map((image, index) => (
          <Grid item key={index} xs={2}>
            <Box
              component="img"
              src={image}
              alt={`Brand ${index + 1}`}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                padding: "10px", // Optional padding for spacing around images
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Brands;
