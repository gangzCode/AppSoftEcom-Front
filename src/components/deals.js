import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Deals = () => {
  const cards = [
    {
      id: 1,
      image: "https://placehold.co/300x400", // Large left card image
      price: "$99.99",
      description: "This is the big feature product on the left.",
      big: true, // Mark as the big card
    },
    {
      id: 2,
      image: "https://placehold.co/200x300", // Tall right card
      price: "$29.99",
      description: "Right top tall product 1.",
    },
    {
      id: 3,
      image: "https://placehold.co/200x300", // Tall right card
      price: "$39.99",
      description: "Right top tall product 2.",
    },
    {
      id: 4,
      image: "https://placehold.co/200x300", // Tall right card
      price: "$49.99",
      description: "Right top tall product 3.",
    },
    {
      id: 5,
      image: "https://placehold.co/200x200", // Short right card
      price: "$19.99",
      description: "Right bottom short product 1.",
    },
    {
      id: 6,
      image: "https://placehold.co/200x200", // Short right card
      price: "$24.99",
      description: "Right bottom short product 2.",
    },
  ];

  return (
    <Box sx={{ padding: "40px 0" }}>
      {/* Title and Subtitle */}
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
        TRENDING DEALS
      </Typography>
      <Typography variant="h4" fontWeight={"600"} component="h2" gutterBottom>
        Deals on this Month
      </Typography>
      <Box sx={{ padding: "40px" }}>
        <Grid container spacing={4}>
          {/* Left Large Card */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "678px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
                flexGrow: 1, // Allow the box to fill the height of the grid
              }}
            >
              <Box
                component="img"
                src={cards[0].image}
                alt={cards[0].description}
                sx={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ padding: "20px", flex: 1 }}>
                <Typography variant="h5" color="primary">
                  {cards[0].price}
                </Typography>
                <Typography variant="body1" paragraph>
                  {cards[0].description}
                </Typography>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Grid: 3 taller cards on top, 2 shorter cards on bottom */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {/* Top Right: 3 taller cards */}
              {cards.slice(1, 4).map((card) => (
                <Grid item xs={12} sm={4} key={card.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.description}
                      sx={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ padding: "10px" }}>
                      <Typography variant="h6" color="primary">
                        {card.price}
                      </Typography>
                      <Typography variant="body2">
                        {card.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}

              {/* Bottom Right: 2 shorter cards */}
              {cards.slice(4, 6).map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.description}
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ padding: "10px" }}>
                      <Typography variant="h6" color="primary">
                        {card.price}
                      </Typography>
                      <Typography variant="body2">
                        {card.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Deals;
