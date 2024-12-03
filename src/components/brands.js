import React from "react";
import { Box, Grid } from "@mui/material";
import { Container } from "../common/Spacing";

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
    <Container>
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
    </Container>
  );
};

export default Brands;
