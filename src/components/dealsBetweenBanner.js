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
          .map((product) => (
            <Grid key={product.id} item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: "240px",
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
                    height={"60px"}
                    gutterBottom
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"20px"}
                    fontWeight={"500"}
                    color="textSecondary"
                  >
                    {JSON.parse(product.brand.name).En || 0}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    color="textSecondary"
                    gutterBottom
                  >
                    ${product.price || 0}
                  </Typography>

                  {/* {product.category && product.category_status === 1 && (
                    <Link to={`/products/${product.category.id}`}>
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
                  )} */}
                  {/* {product.brand && product.brand_status === 1 && ( */}
                  <Link to={`${product.url}`}>
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
                  {/* )} */}
                </Box>

                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
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

export default DealsBetweenBanner;
