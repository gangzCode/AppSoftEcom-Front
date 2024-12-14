import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { getPromotions } from "../services/apiCalls";
import { Link } from "react-router-dom";

const TopSellingBetweenBanner = () => {
  const [promotions, setpromotions] = useState([]);

  useEffect(() => {
    const fetchGetPromotions = async () => {
      try {
        const response = await getPromotions();

        setpromotions(response.data.filter((item) => item.type === "Top"));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // if (promotions.length === 0) {
    fetchGetPromotions();
    // }
  }, []);

  return (
    <Box sx={{ padding: { xs: "15px 0", md: "30px 0" } }}>
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
        {promotions.length > 0 && (
          <Grid item xs={12} sm={6} md={8} key={promotions[0].id}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                borderRadius: { xs: "20px", md: "30px" },
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                boxShadow: 2,
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <CardMedia
                  component="img"
                  image={promotions[0].image}
                  alt={promotions[0].title}
                  sx={{
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
        {promotions.length > 1 && (
          <Grid item xs={12} sm={6} md={4} key={promotions[1].id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "right",
                flexDirection: "row-reverse",
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                boxShadow: 2,
                height: "100%",
              }}
            >
              <CardContent sx={{ flex: 1, height: "240px" }}>
                <CardMedia
                  component="img"
                  image={promotions[1].image}
                  alt={promotions[1].title}
                  sx={{
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TopSellingBetweenBanner;
