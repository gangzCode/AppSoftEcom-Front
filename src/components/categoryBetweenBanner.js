import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { getPromotions } from "../services/apiCalls";
import { Link } from "react-router-dom";
import { Container } from "../common/Spacing";

const CategoryBetweenBanner = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchGetPromotions = async () => {
      try {
        const response = await getPromotions();
        setPromotions(response.data);
        console.log("Featured ::::: ", response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    if (promotions.length === 0) {
      fetchGetPromotions();
    }
  }, [promotions.length]);

  const getGridColumns = () => {
    const count = promotions.filter(
      (promo) => promo.type === "Category"
    ).length;
    return {
      xs: 12,
      sm: 6,
      md: count >= 3 ? 4 : 6,
      lg: count >= 4 ? 3 : count >= 3 ? 4 : 6,
    };
  };

  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {promotions
          .filter((promo) => promo.type === "Category")
          .map((promo, index) => (
            <Grid item {...getGridColumns()} key={index}>
              {promo.url ? (
                <Link
                  to={promo.url}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      backgroundImage: `url(${
                        promo.image ||
                        "https://placehold.co/360x340?text=Image+Not+Found"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: { xs: "200px", md: "300px" },
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  />
                </Link>
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    backgroundImage: `url(${
                      promo.image ||
                      "https://placehold.co/360x340?text=Image+Not+Found"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: { xs: "200px", md: "300px" },
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                />
              )}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default CategoryBetweenBanner;
