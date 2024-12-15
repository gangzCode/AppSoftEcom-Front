import React from "react";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronRight, Favorite, ShoppingCart } from "@mui/icons-material";

const ProductCard = ({
  product,
  hoveredProductId,
  setHoveredProductId,
  handleAddToCart,
  handleAddToWishlist,
  addingToCartId,
  isInWishlist,
  isHovered,
}) => {
  return (
    <Box
      key={product.id}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "280px",
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
        <Box>
          {product?.soldOut && (
            <Chip
              label="Sold Out"
              color="error"
              sx={{ position: "absolute", top: 16, left: 16 }}
            />
          )}
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
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "240px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Product Images */}
            <Box
              component="img"
              src={product.thumbnailz}
              alt={product.name}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                transition: "opacity 0.5s ease",
                opacity: isHovered === product.id ? 0 : 1,
              }}
            />
            <Box
              component="img"
              src={product.images[0]}
              alt={product.description}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "200px",
                objectFit: "contain",
                transition: "opacity 0.5s ease",
                opacity: isHovered === product.id ? 1 : 0,
              }}
            />
          </Box>

          <Typography
            variant="caption"
            fontSize={"12px"}
            color={"#bebebe"}
            sx={{ letterSpacing: "1px", marginBottom: "3px" }}
          >
            {product.category_name}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="400"
            sx={{ marginBottom: "8px" }}
          >
            {product.name.substr(0, 20)}
          </Typography>
          <Box
            display={"flex"}
            justifyContent="space-between"
            sx={{ marginTop: "auto" }}
          >
            <Typography variant="h6" fontSize={"22px"} fontWeight="600">
              {product.currency} {product.sales_price}
            </Typography>
            <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
          </Box>
        </Box>
      </Link>

      {/* Action Buttons */}
      <IconButton
        onClick={() => handleAddToCart(product)}
        sx={{
          position: "absolute",
          top: "38%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#2189ff",
          color: "#fff",
          borderRadius: "10px",
          width: "40px",
          height: "40px",
          opacity: hoveredProductId === product.id ? 1 : 0,
          visibility: hoveredProductId === product.id ? "visible" : "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#000",
          },
          zIndex: 2,
        }}
      >
        {addingToCartId === product.id ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <ShoppingCart />
        )}
      </IconButton>

      <IconButton
        onClick={() => handleAddToWishlist(product)}
        sx={{
          position: "absolute",
          top: "38%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          backgroundColor: isInWishlist[product.id] ? "#ff4646" : "#2189ff",
          color: "#fff",
          borderRadius: "10px",
          width: "40px",
          height: "40px",
          opacity: hoveredProductId === product.id ? 1 : 0,
          visibility: hoveredProductId === product.id ? "visible" : "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: isInWishlist[product.id] ? "#ff6b6b" : "#000",
          },
          zIndex: 2,
        }}
      >
        <Favorite />
      </IconButton>
    </Box>
  );
};

export default ProductCard;
