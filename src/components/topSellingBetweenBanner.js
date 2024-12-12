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
        console.log("Featured Top ", response.data);
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
                  padding: { xs: 2, sm: 3 },
                  height: { xs: "auto", sm: "160px" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Typography
                  variant="p"
                  fontSize={{ xs: "10px", sm: "12px" }}
                  color={"#1e1e1e"}
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      marginLeft: "1em",
                      transform: "translateY(-50%)",
                      width: { xs: "100px", sm: "150px" },
                      height: "2px",
                      backgroundColor: "#2189ff",
                    },
                  }}
                >
                  {promotions[0].type}
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={"24px"}
                  fontWeight="600"
                  sx={{ mb: 1 }}
                >
                  {promotions[0].title}
                </Typography>
                <Typography variant="h4" fontSize={"24px"} fontWeight="500">
                  {/* ${promotions[0].price.toLocaleString()} */}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textDecoration: "line-through", mb: 2 }}
                >
                  {promotions[0].price}
                </Typography>
                {promotions[0].category &&
                  promotions[0].category_status === 1 && (
                    <Link to={`/products/${promotions[0].category.id}`}>
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
                {promotions[0].brand && promotions[0].brand_status === 1 && (
                  <Link to={`/products/${promotions[0].brand.id}`}>
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
              </CardContent>
              <CardMedia
                component="img"
                image={promotions[0].image}
                alt={promotions[0].title}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  height: "auto",
                  objectFit: "cover",
                }}
              />
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
              <CardContent sx={{ flex: 1, padding: 3, height: "240px" }}>
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
                      transform: "translateX(-135%)",
                      width: "150px",
                      height: "2px",
                      backgroundColor: "#2189ff",
                    },
                  }}
                >
                  {promotions[1].type}
                </Typography>
                <Typography
                  variant="h6"
                  fontSize={"24px"}
                  fontWeight="600"
                  sx={{ mb: 1 }}
                >
                  {promotions[1].title}
                </Typography>
                <Typography variant="h4" fontSize={"24px"} fontWeight="500">
                  {/* ${promotions[1].price.toLocaleString()} */}
                </Typography>{" "}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textDecoration: "line-through", mb: 2 }}
                >
                  {/* ${promotions[1].originalPrice.toLocaleString()} */}
                </Typography>
                {promotions[1].category &&
                  promotions[1].category_status === 1 && (
                    <Link to={`/products/${promotions[1].category.id}`}>
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
                {promotions[1].brand && promotions[1].brand_status === 1 && (
                  <Link to={`/products/${promotions[1].brand.id}`}>
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
              </CardContent>
              <CardMedia
                component="img"
                image={promotions[1].image}
                alt={promotions[1].title}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TopSellingBetweenBanner;
