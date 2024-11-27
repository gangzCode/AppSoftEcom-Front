import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Link, Button } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { getPromotions } from "../services/apiCalls";

const HomeBetweenBanner = () => {
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

  return (
    <Grid container paddingY={"2em"} marginY={"2em"} spacing={2}>
      {promotions
        .filter((promo) => promo.type === "Home")
        .map((promo, index) => (
          <Grid item xs={12} md={4} key={index}>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  color: "white",
                  padding: "5em",
                  borderRadius: "10px",
                  textAlign: "right",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={"700"}
                  color={"#1e1e1e"}
                  gutterBottom
                >
                  {promo.title}
                </Typography>
                {promo.category && promo.category_status === 1 && (
                  <Link to={`/products/${promo.category.id}`}>
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
                      Shop Now <ChevronRight />
                    </Button>
                  </Link>
                )}
                {promo.brand && promo.brand_status === 1 && (
                  <Link to={`/products/${promo.brand.id}`}>
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
                      Shop Now <ChevronRight />
                    </Button>
                  </Link>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

export default HomeBetweenBanner;
