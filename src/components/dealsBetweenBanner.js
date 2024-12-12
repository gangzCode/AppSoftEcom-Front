import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { getPromotions } from "../services/apiCalls";
import { Link } from "react-router-dom";
import { Container } from "../common/Spacing";

const DealsBetweenBanner = () => {
  const [promotions, setpromotions] = useState([]);

  useEffect(() => {
    const fetchGetPromotions = async () => {
      try {
        const response = await getPromotions();
        setpromotions(response.data);
        console.log("Featured ::::: ", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (promotions.length === 0) {
      fetchGetPromotions();
    }
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {promotions
          .filter((promo) => promo.type === "Deal")
          .slice(0, 5)
          .map((product, index) => (
            <Grid key={`deal-${product.id || index}`} item xs={12} md={6}>
              <Box
                component="img"
                src={
                  product.image ||
                  "https://placehold.co/360x340?text=Image+Not+Found"
                }
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: "240px",
                  // backgroundColor: "#f3f3f3",
                }}
              ></Box>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default DealsBetweenBanner;
