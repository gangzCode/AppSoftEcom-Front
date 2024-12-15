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
  getSpecialDayOfferSaleProducts,
  getCartDetails,
  addToCart,
  addToCartGuest,
  addToWishlist,
  getAuthToken,
} from "../services/apiCalls";
import { Container } from "../common/Spacing";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const SpecialDayOfferSale = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("Default Title");
  const [subTitle, setSubTitle] = useState("Default Subtitle");
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isInWishlist, setIsInWishlist] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getSpecialDayOfferSaleProducts();
        setTitle(response?.title || "Default Title");
        setSubTitle(response?.sub_title || "Default Subtitle");
        const filteredProducts = (response?.data || []).filter(
          (product) => product.category.status === "1"
        );
        setFilteredProducts(filteredProducts);
        setProducts(response?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

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
        setSnackbarMessage("Sorry, this item is out of stock");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
        setSnackbarMessage(
          "Item already in cart. Please update quantity in cart."
        );
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
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
      setSnackbarMessage("Added to cart successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setSnackbarMessage("Failed to add to cart");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
      setSnackbarMessage("This product is already in your wishlist!");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      return;
    }

    try {
      await addToWishlist(product.id);
      setIsInWishlist((prev) => ({
        ...prev,
        [product.id]: true,
      }));
      setSnackbarMessage("Added to wishlist successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to add to wishlist");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
        {filteredProducts.length > 0 && filteredProducts !== null ? (
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

export default SpecialDayOfferSale;
