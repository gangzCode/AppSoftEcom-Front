import React, { useState,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Grid, Typography,Chip } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { CurrencyContext } from "../context/CurrencyContext";

const CustomProducts = () => {
  const location = useLocation();
  const { title, products } = location.state || [];
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const { selectedCurrency } = useContext(CurrencyContext);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          marginBottom: "30px",
          padding: "30px",
          border: "1px solid #e9e9e9",
        }}
      >
        <Typography variant="h3" fontWeight="500">
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            marginTop: 1,
          }}
        >
         {/* {1} Products available */}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                borderRadius: "20px",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                ":hover": {
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                },
              }}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <Link to={`/product/${product.id}`}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={product.thumbnailz || "https://placehold.co/360x340"}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {product?.discount && (
                  <Chip
                    label={`-${product.discount}%`}
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

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name.substr(0, 20)}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                <Typography variant="h6" fontSize={"22px"} fontWeight="600">
                {selectedCurrency.code === "Rs" 
      ? `${product.currency} ${(product.sales_price * (1 - product.discount / 100)).toFixed(2)}`
      : `${selectedCurrency.code} ${((product.sales_price * (1 - product.discount / 100)) / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                </Typography>
                {product?.discount && (
                <Typography
                  variant="h6"
                  fontSize={"16px"}
                  fontWeight="600"
                  color={"#bebebe"}
                  sx={{
                    marginLeft: "8px",
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                 {selectedCurrency.code === "Rs" 
      ? `${product.currency} ${product.sales_price}`
      : `${selectedCurrency.code} ${(product.sales_price / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                </Typography>
                )}
                <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                </Box>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomProducts;
