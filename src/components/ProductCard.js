import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Favorite, ShoppingCart } from "@mui/icons-material";
import {
  getCartDetails,
  addToCart,
  addToCartGuest,
  addToWishlist,
  getAuthToken,
} from "../services/apiCalls";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      if (product.total_stock <= 0) {
        setSnackbar({
          open: true,
          message: "Sorry, this item is out of stock",
          severity: "error",
        });
        return;
      }

      if (product.product_variation_tempalte?.length > 0) {
        navigate(`/product/${product.id}`);
        return;
      }

      setAddingToCartId(product.id);

      const cartResponse = await getCartDetails();
      const cartItems = cartResponse.data || [];

      const existingItem = cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        setSnackbar({
          open: true,
          message: "Item already in cart. Please update quantity in cart.",
          severity: "info",
        });
        return;
      }

      const cartItem = {
        product_id: product.id,
        discount: product.discount || "",
        quantity: "1",
        line_discount_type: "percentage",
        unit_price: product.sales_price.toString(),
      };

      const userStr = localStorage.getItem("user");
      if (userStr) {
        await addToCart(getAuthToken(), cartItem);
      } else {
        await addToCartGuest(cartItem);
      }

      setSnackbar({
        open: true,
        message: "Added to cart successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add to cart",
        severity: "error",
      });
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleAddToWishlist = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
      return;
    }

    if (isInWishlist) {
      setSnackbar({
        open: true,
        message: "This product is already in your wishlist!",
        severity: "info",
      });
      return;
    }

    try {
      await addToWishlist(product.id);
      setIsInWishlist(true);
      setSnackbar({
        open: true,
        message: "Added to wishlist successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add to wishlist",
        severity: "error",
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`} key={product.id}>
      <Box
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
        onMouseEnter={() => setIsHovered(product.id)}
        onMouseLeave={() => setIsHovered(null)}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "240px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
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
          <IconButton
            onClick={handleAddToCart}
            disabled={addingToCartId === product.id}
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
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? "visible" : "hidden",
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
            onClick={handleAddToWishlist}
            sx={{
              position: "absolute",
              top: "38%",
              left: "60%",
              transform: "translate(-50%, -50%)",
              backgroundColor: isInWishlist ? "#ff4646" : "#2189ff",
              color: "#fff",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? "visible" : "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isInWishlist ? "#ff6b6b" : "#000",
              },
              zIndex: 2,
            }}
          >
            <Favorite />
          </IconButton>
        </Box>

        <Box
          className="hover-icons"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: "8px",
            opacity: isHovered === product.id ? 1 : 0,
            visibility: isHovered === product.id ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
          }}
        >
          {[
            { icon: <ShoppingCart />, id: "cart" },
            { icon: <Favorite />, id: "favorite" },
          ].map((item) => (
            <IconButton
              key={item.id}
              sx={{
                backgroundColor: "#2189ff",
                color: "#fff",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              {item.icon}
            </IconButton>
          ))}
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
            ${product.sales_price}
          </Typography>
          <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Link>
  );
};

export default ProductCard;
