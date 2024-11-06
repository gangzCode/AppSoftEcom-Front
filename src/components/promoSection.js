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
    image: "https://placehold.co/1000x400?text=Smartphones",
  },
  {
    id: 2,
    category: "SMARTWATCHES",
    title: "Get 20% Flat Off",
    price: 1500,
    originalPrice: 4500,
    image: "https://placehold.co/400x200?text=Smartwatches",
  },
];

const PromoSection = () => {
  return (
    <Box sx={{ padding: "30px 0" }}>
      <Grid container spacing={3} justifyContent="center">
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
                {promoItems[0].category}
              </Typography>
              <Typography
                variant="h6"
                fontSize={"24px"}
                fontWeight="600"
                sx={{ mb: 1 }}
              >
                {promoItems[0].title}
              </Typography>
              <Typography variant="h4" fontSize={"24px"} fontWeight="500">
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
                sx={{
                  backgroundColor: "#2189ff",
                  padding: ".4em 1.8em",
                  borderRadius: "8px",
                  textTransform: "unset",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                variant="contained"
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

        <Grid item xs={12} sm={6} md={4} key={promoItems[1].id}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "right",
              flexDirection: "row-reverse",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#f8f9fa",
              boxShadow: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ flex: 1, padding: 3 }}>
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
                    transform: "translateX(-185%)",
                    width: "150px",
                    height: "2px",
                    backgroundColor: "#2189ff",
                  },
                }}
              >
                {promoItems[1].category}
              </Typography>
              <Typography
                variant="h6"
                fontSize={"24px"}
                fontWeight="600"
                sx={{ mb: 1 }}
              >
                {promoItems[1].title}
              </Typography>
              <Typography variant="h4" fontSize={"24px"} fontWeight="500">
                ${promoItems[1].price.toLocaleString()}
              </Typography>{" "}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textDecoration: "line-through", mb: 2 }}
              >
                ${promoItems[1].originalPrice.toLocaleString()}
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#2189ff",
                  padding: ".4em 1.8em",
                  borderRadius: "8px",
                  textTransform: "unset",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                variant="contained"
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
