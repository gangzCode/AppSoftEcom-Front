import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

const BestSeller2 = () => {
  const cards = [
    {
      id: 1,
      image: "https://placehold.co/300x200", // Replace with your product image URL
      title: "Buy a Standard Products with Great Offers",
      description: "$4000",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      image: "https://placehold.co/300x200", // Replace with your product image URL
      title: "Product 2",
      description:
        "This is a short description of Product 2. It is a premium item.",
      buttonText: "Shop Now",
    },
  ];

  return (
    <Box sx={{}}>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on larger
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ flex: 1, padding: 3 }}>
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
                  TABLETS
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={"700"}
                  component="h2"
                  gutterBottom
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={"24px"}
                  color="textSecondary"
                  gutterBottom
                >
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  backgroundColor="#007aff"
                  color="primary"
                >
                  {card.buttonText}
                </Button>
              </Box>

              {/* Image Section */}
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: { xs: "100%", md: "300px" }, // Full width on small screens, fixed width on larger
                  height: "auto",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSeller2;
