import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Container } from "../common/Spacing";
import { getBestTopNewArrivalTabProducts } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";

const TabSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    BestSellers: [],
    NewArrivals: [],
    TopSellings: [],
  });

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const response = await getBestTopNewArrivalTabProducts();
        const {
          best = [],
          new_arrives = [],
          top_selling = [],
        } = response?.data || {};

        setProducts({
          BestSellers: best || [],
          NewArrivals: new_arrives || [],
          TopSellings: top_selling || [],
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchGetProducts();
  }, []);

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const tabKeys = Object.keys(products);

  return (
    <Container>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          borderBottom: "1px solid #1e1e1e",
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            fontWeight: "bold",
            padding: "12px 24px",
            color: "#333",
            transition: "0.3s",
            borderRadius: "8px 8px 0 0",
          },
          "& .MuiTab-root[tabIndex='0']": {
            color: "#fff",
            backgroundColor: "#007bff",
          },
          "& .MuiTab-root:hover": {
            backgroundColor: "#d3e5ff",
          },
          "& .MuiTab-root:hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        {tabKeys.map((tab, index) => (
          <Tab key={index} label={tab.replace(/([A-Z])/g, " $1").trim()} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tabKeys.map((tab, index) => (
          <Box
            key={index}
            role="tabpanel"
            hidden={selectedTab !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {selectedTab === index && (
              <Grid container spacing={3}>
                {products[tab]?.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: "#f3f3f3",
                        display: "flex",
                        alignItems: "center",
                        padding: 4,
                        borderRadius: "20px",
                        position: "relative",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => handleCardClick(product.id)}
                    >
                      {/* Sold Out Chip */}
                      {product?.soldOut && (
                        <Chip
                          label="Sold Out"
                          color="error"
                          sx={{ position: "absolute", top: 16, left: 16 }}
                        />
                      )}
                      {/* Discount Chip */}
                      {product.discount && (
                        <Chip
                          label={"-" + product.discount + "%"}
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "#ff4646",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            zIndex: 1,
                            fontSize: "14px",
                          }}
                        />
                      )}

                      {/* Product Image */}
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          width: 100,
                          height: 100,
                          marginRight: 2,
                          borderRadius: 1,
                        }}
                      />

                      {/* Product Details */}
                      <CardContent sx={{ flex: 1, paddingLeft: 0 }}>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          textTransform="uppercase"
                        >
                          {product.category_name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {product?.name.length > 30
                            ? product?.name.slice(0, 30) + "..."
                            : product?.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          fontWeight="bold"
                        >
                          ${product.price.toLocaleString()}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ${product.originalPrice.toLocaleString()}
                          </Typography>
                        )}
                      </CardContent>
                      {/* Icon Button */}
                      <IconButton>
                        <ChevronRightIcon />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TabSection;
