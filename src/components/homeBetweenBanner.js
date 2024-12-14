import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getPromotions } from "../services/apiCalls";
import { Container } from "../common/Spacing";

const HomeBetweenBanner = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchGetPromotions = async () => {
      try {
        const response = await getPromotions();
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    if (promotions.length === 0) {
      fetchGetPromotions();
    }
  }, [promotions.length]);

  return (
    <Container>
      <Grid container spacing={2}>
        {promotions
          .filter((promo) => promo.type === "Home")
          .map((promo, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                      height: "300px",
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
                    height: "300px",
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

export default HomeBetweenBanner;
