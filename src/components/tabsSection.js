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
import { getTopSellingProducts } from "../services/apiCalls";

// const products = {
//   BestSellers: [
//     {
//       id: 1,
//       category: "Television-Sky",
//       name: "Ultra HD Android Smart LED TV X43 ultrs plus hd",
//       price: 25990,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: false,
//     },
//     {
//       id: 2,
//       category: "Products-Vibe",
//       title: "Newly launched Bluetooth Calling Smartwatch",
//       price: 2999,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: false,
//     },
//     {
//       id: 3,
//       category: "Electro",
//       title: "Isolated Black Desktop computer",
//       price: 2897,
//       originalPrice: 4599,
//       image: "https://via.placeholder.com/200",
//       discount: "35%",
//       soldOut: false,
//     },
//     {
//       id: 4,
//       category: "Products-Vibe",
//       title: "Wireless Earbud Bluetooth Headphone",
//       price: 1290,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: true,
//     },
//   ],
//   NewArrivals: [
//     {
//       id: 5,
//       category: "Television-Sky",
//       title: "4K Ultra HD Smart LED Fire TV",
//       price: 54999,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: false,
//     },
//     {
//       id: 6,
//       category: "Mobile Veritas",
//       title: "Wireless Gaming Controller Joystick",
//       price: 790,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: false,
//     },
//     {
//       id: 7,
//       category: "Electro",
//       title: "Inverter Split AC",
//       price: 34980,
//       image: "https://via.placeholder.com/200",
//       discount: null,
//       soldOut: false,
//     },
//   ],
//   // TopSellings: [
//   //   {
//   //     id: 8,
//   //     category: "Mobile Veritas",
//   //     title: "G21 Android Smartphone Dual SIM",
//   //     price: 25990,
//   //     originalPrice: 30000,
//   //     image: "https://via.placeholder.com/200",
//   //     discount: "13%",
//   //     soldOut: false,
//   //   },
//   //   {
//   //     id: 9,
//   //     category: "Products-Vibe",
//   //     title: "Cozy Padded Earcups Headphones",
//   //     price: 1544,
//   //     image: "https://via.placeholder.com/200",
//   //     discount: null,
//   //     soldOut: true,
//   //   },
//   // ],
// };

const TabSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setproducts] = useState({
    BestSellers: [
      {
        id: 1,
        category_name: "Television-Sky",
        name: "Ultra HD Android Smart LED TV X43 ultrs plus hd",
        price: 25990,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: false,
      },
      {
        id: 2,
        category_name: "Products-Vibe",
        name: "Newly launched Bluetooth Calling Smartwatch",
        price: 2999,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: false,
      },
      {
        id: 3,
        category_name: "Electro",
        name: "Isolated Black Desktop computer",
        price: 2897,
        originalPrice: 4599,
        image: "https://via.placeholder.com/200",
        discount: "35%",
        soldOut: false,
      },
      {
        id: 4,
        category_name: "Products-Vibe",
        name: "Wireless Earbud Bluetooth Headphone",
        price: 1290,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: true,
      },
    ],
    NewArrivals: [
      {
        id: 5,
        category_name: "Television-Sky",
        name: "4K Ultra HD Smart LED Fire TV",
        price: 54999,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: false,
      },
      {
        id: 6,
        category_name: "Mobile Veritas",
        name: "Wireless Gaming Controller Joystick",
        price: 790,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: false,
      },
      {
        id: 7,
        category_name: "Electro",
        name: "Inverter Split AC",
        price: 34980,
        image: "https://via.placeholder.com/200",
        discount: null,
        soldOut: false,
      },
    ],
    TopSellings: [],
  });

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await getTopSellingProducts();
        const data = await response.data;
        setproducts((prevProducts) => ({
          ...prevProducts,
          BestSellers: data,
        }));
        console.log("Featured products ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabKeys = Object.keys(products);

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
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
            fontSize: 18,
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
                {products[tab].map((product) => (
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
                        // boxShadow: 3,

                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 4,
                        },
                      }}
                    >
                      {product.soldOut && (
                        <Chip
                          label="Sold Out"
                          color="error"
                          sx={{ position: "absolute", top: 16, left: 16 }}
                        />
                      )}
                      {product.discount && (
                        <Chip
                          label={product.discount}
                          color="primary"
                          sx={{ position: "absolute", top: 16, right: 16 }}
                        />
                      )}
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          width: 100,
                          height: 100,
                          marginRight: 2,
                          borderRadius: 1,
                        }}
                      />
                      <CardContent sx={{ flex: 1, paddingLeft: 0 }}>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          textTransform="uppercase"
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {product.name}
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
    </Box>
  );
};

export default TabSection;
