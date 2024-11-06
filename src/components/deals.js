import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Deals = () => {
  const cards = [
    {
      id: 1,
      image: "https://placehold.co/300x400",
      price: "$25999.99",
      description:
        "Acer Frameless 80 cm (32 inch) HD Ready LED Smart Android TV with Google Assistant",
      big: true,
    },
    {
      id: 2,
      image: "https://placehold.co/200x300",
      price: "$29.99",
      description: "Right top tall product 1.",
    },
    {
      id: 3,
      image: "https://placehold.co/200x300",
      price: "$39.99",
      description: "Right top tall product 2.",
    },
    {
      id: 4,
      image: "https://placehold.co/200x300",
      price: "$49.99",
      description: "Right top tall product 3.",
    },
    {
      id: 5,
      image: "https://placehold.co/200x200",
      price: "$19.99",
      description: "Right bottom short product 1.",
    },
    {
      id: 6,
      image: "https://placehold.co/200x200",
      price: "$24.99",
      description: "Right bottom short product 2.",
    },
  ];

  return (
    <Box sx={{ padding: "40px 0" }}>
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
      <Box sx={{ padding: "40px 0" }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "678px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#fff",
                flexGrow: 1,
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
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  fontSize={"36px"}
                  fontWeight={"600"}
                >
                  {cards[0].price}
                </Typography>
                <Typography
                  variant="caption"
                  color="#bebebe"
                  fontWeight={"500"}
                  fontSize={"10px"}
                  letterSpacing={"2px"}
                  sx={{ textTransform: "uppercase" }}
                >
                  Laptops
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={"16px"}
                  fontWeight={"500"}
                >
                  {cards[0].description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              {cards.slice(1, 4).map((card) => (
                <Grid item xs={12} sm={4} key={card.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      },
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

              {cards.slice(4, 6).map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      },
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
