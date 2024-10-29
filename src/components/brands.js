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
    <Box sx={{ padding: "4em 0" }}>
      <Grid container spacing={2} justifyContent="space-between">
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
