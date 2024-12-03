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
    return count > 0 ? Math.min(count, 5) : 1;
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {promotions
          .filter((promo) => promo.type === "Category")
          .map((promo) => (
            <Grid key={promo.id} item md={12 / getGridColumns()}>
              <Box
                sx={{
                  height: "200px",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "30px",
                  overflow: "hidden",
                  backgroundColor: "#f3f3f3",
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
                    {promo.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    color="textSecondary"
                    gutterBottom
                  >
                    ${promo.price ? promo.price : 0}
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
                        Shop Now
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
                        Shop Now
                      </Button>
                    </Link>
                  )}
                </Box>

                <Box
                  component="img"
                  src={promo.image}
                  alt={promo.title}
                  sx={{
                    width: { xs: "100%", md: "300px" },
                    height: "auto",
                  }}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default CategoryBetweenBanner;
