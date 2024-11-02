import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const promoItems = [
  {
    id: 1,
    category: "SMART PHONES",
    title: "Grab Our Hot Deals",
    price: 18800,
    originalPrice: 29000,
    image: "https://placehold.co/1000x400?text=Smartphones", // Replace with actual image
  },
  {
    id: 2,
    category: "SMARTWATCHES",
    title: "Get 20% Flat Off",
    price: 1500,
    originalPrice: 4500,
    image: "https://placehold.co/400x200?text=Smartwatches", // Replace with actual image
  },
];

const PromoSection = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* First grid item with md=8 */}
        <Grid item xs={12} sm={6} md={8} key={promoItems[0].id}>
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#f8f9fa",
              boxShadow: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ flex: 1, padding: 3 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {promoItems[0].category}
              </Typography>
              <Box
                sx={{
                  width: "50px",
                  borderBottom: "2px solid #007bff",
                  marginY: 1,
                }}
              />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {promoItems[0].title}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${promoItems[0].price.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textDecoration: "line-through", mb: 2 }}
              >
                ${promoItems[0].originalPrice.toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  paddingX: 3,
                  paddingY: 1,
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                Shop Now
              </Button>
            </CardContent>
            <CardMedia
              component="img"
              image={promoItems[0].image}
              alt={promoItems[0].title}
              sx={{
                width: { xs: "100%", sm: "200px" },
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>

        {/* Second grid item with md=4 */}
        <Grid item xs={12} sm={6} md={4} key={promoItems[1].id}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#f8f9fa",
              boxShadow: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ flex: 1, padding: 3 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {promoItems[1].category}
              </Typography>
              <Box
                sx={{
                  width: "50px",
                  borderBottom: "2px solid #007bff",
                  marginY: 1,
                }}
              />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {promoItems[1].title}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${promoItems[1].price.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textDecoration: "line-through", mb: 2 }}
              >
                ${promoItems[1].originalPrice.toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  paddingX: 3,
                  paddingY: 1,
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                Shop Now
              </Button>
            </CardContent>
            <CardMedia
              component="img"
              image={promoItems[1].image}
              alt={promoItems[1].title}
              sx={{
                width: { xs: "100%", sm: "200px" },
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromoSection;
