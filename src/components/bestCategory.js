import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, ShoppingCart, Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  getCartDetails,
  addToCart,
  addToCartGuest,
  addToWishlist,
  getAuthToken,
} from "../services/apiCalls";
import { Container } from "../common/Spacing";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";

const BestCategory = ({title,subTitle,filteredProducts,products}) => {
  const scrollContainerRef = useRef(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const navigate = useNavigate();
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isInWishlist, setIsInWishlist] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const { showSnackbar } = useSnackbar();


  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    },
    onSwipedRight: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleAddToCart = async (product) => {
    try {
      // Check stock
      if (product.total_stock <= 0) {
        showSnackbar("Sorry, this item is out of stock","error");
        return;
      }

      // Check for variations
      if (product.product_variation_combination?.length > 0) {
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
        showSnackbar(
          "Item already in cart. Please update quantity in cart.","info"
        );
        return;
      }

      // Add new item to cart
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
      showSnackbar("Added to cart successfully","success");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      showSnackbar("Failed to add to cart","error");
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleAddToWishlist = async (product) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
      return;
    }

    if (isInWishlist[product.id]) {
      showSnackbar("This product is already in your wishlist!","info");
      return;
    }

    try {
      await addToWishlist(product.id);
      setIsInWishlist((prev) => ({
        ...prev,
        [product.id]: true,
      }));
      showSnackbar("Added to wishlist successfully!","success");
    } catch (error) {
      showSnackbar("Failed to add to wishlist","error");
    }
  };

  return (
    <Container>
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
        {subTitle}
      </Typography>
      <Typography
        onClick={() =>
          navigate("/custom-products", {
            state: { title, products: products },
          })
        }
        variant="h4"
        fontWeight={"600"}
        component="h2"
        gutterBottom
        width={"fit-content"}
        sx={{
          cursor: "pointer",
          transition: "color 0.3s ease",
          fontSize: { xs: "24px", sm: "32px", md: "40px" },
          "&:hover": {
            color: "#2189ff",
          },
        }}
      >
        {title}
      </Typography>
      <Box
        {...handlers}
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 3,
          padding: 2,
          scrollBehavior: "smooth",
          paddingBottom: "50px",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2189ff",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ccc",
          },
        }}
      >
        {filteredProducts?.length > 0 && filteredProducts !== null ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hoveredProductId={hoveredProductId}
              setHoveredProductId={setHoveredProductId}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              addingToCartId={addingToCartId}
              isInWishlist={isInWishlist}
              isHovered={isHovered}
            />
          ))
        ) : (
          <Typography variant="body1">No products available.</Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BestCategory;