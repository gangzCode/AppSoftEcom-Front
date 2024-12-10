import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  CardMedia,
  IconButton,
  TextField,
  Divider,
  ButtonGroup,
  Chip,
  Table,
  TableRow,
  TableCell,
  Breadcrumbs,
  Link,
  styled,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ProductDetailAccordian from "./ProductDetailAccordian";
import {
  addToCart,
  addToCartGuest,
  fetchProductById,
  getCartDetails,
  updateCartItem,
  addToWishlist,
  getWishListofUser,
} from "../../services/apiCalls";
import NotFoundPage from "../../components/404";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const ProductDetailsPage = () => {
  const [product, setproduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSpecification, setSelectedSpecification] = useState("");
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedCombination, setSelectedCombination] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(JSON.stringify(selectedCombination) + "selectedCombination");

    return () => {};
  }, [selectedCombination]);

  useEffect(() => {
    const fetchGetProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchProductById(productId);
        setproduct(response.data);
        console.log("productbyid ::::: ", response.data);

        const variationImages = response.data.product_variation_combination
          .map((combination) => combination.image)
          .flat();

        setproduct((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, ...variationImages],
        }));

        if (response.data.product_variation_tempalte.length > 0) {
          const initialVariations = {};
          response.data.product_variation_tempalte.forEach((variation) => {
            if (variation.option.length > 0) {
              const firstOption = variation.option[0];
              const matchingCombination =
                response.data.product_variation_combination.find(
                  (combination) =>
                    combination.attributes[variation.name] === firstOption.name
                );

              if (matchingCombination && matchingCombination.stock > 0) {
                initialVariations[variation.name] = firstOption.name;
              }

              if (matchingCombination) {
                setSelectedCombination({
                  id: matchingCombination.attribute_id,
                  price: matchingCombination.price || product?.sales_price,
                  stock: matchingCombination.stock,
                  sku: matchingCombination.sku,
                });
              }
            }
          });
          setSelectedVariations(initialVariations);
        }

        if (response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetProductDetails();
  }, [productId]);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      if (!product || !product.id) {
        return;
      }
      try {
        const response = await getWishListofUser();
        if (response && response.data) {
          const isProductInWishlist = response.data.some(
            (item) => item.id === product.id
          );
          setIsInWishlist(isProductInWishlist);
        } else {
          console.error("Wishlist response does not contain data:", response);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    checkIfInWishlist();
  }, [product]);

  const handleAddToWishlist = async () => {
    if (isInWishlist) {
      setSnackbar({
        open: true,
        message: "This product is already in your wishlist!",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      await addToWishlist(product.id);
      setIsInWishlist(true);
      setSnackbar({
        open: true,
        message: "Product added to wishlist successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.message || "Failed to add product to wishlist",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = useCallback(() => {
    if (!product || !selectedVariations) return 0;

    let basePrice = 0;

    if (product.product_variation_tempalte.length > 0) {
      product.product_variation_tempalte.forEach((variation) => {
        const selectedOption = variation.option.find(
          (opt) => opt.name === selectedVariations[variation.name]
        );
        if (selectedOption?.value) {
          basePrice += parseFloat(selectedOption.value);
        } else {
        }
      });
    } else {
      basePrice = product.sales_price;
    }

    return basePrice * quantity;
  }, [product, selectedVariations, quantity]);

  const totalPrice = calculateTotalPrice();

  const getStockForSelection = useCallback(() => {
    if (!product?.product_variation_combination?.length) return 0;

    const matchingCombination = product.product_variation_combination.find(
      (combination) =>
        JSON.stringify(combination.attributes) ===
        JSON.stringify(selectedVariations)
    );

    return matchingCombination ? matchingCombination.stock : 0;
  }, [selectedVariations, product]);

  const availableStock = getStockForSelection();

  const isVariationEnabled = (variationIndex) => {
    const priorVariations = product.product_variation_tempalte.slice(
      0,
      variationIndex
    );

    return priorVariations.every(
      (priorVariation) => selectedVariations[priorVariation.name] !== undefined
    );
  };

  const isOptionValid = useCallback(
    (variationName, optionName) => {
      const tempSelectedVariations = {
        ...selectedVariations,
        [variationName]: optionName,
      };

      return product.product_variation_combination.some((combination) =>
        Object.entries(tempSelectedVariations).every(
          ([key, value]) => combination.attributes[key] === value
        )
      );
    },
    [product, selectedVariations]
  );

  const areAllVariationsSelected = useCallback(() => {
    if (!product?.product_variation_tempalte?.length) return true;

    return product.product_variation_tempalte.every(
      (variation) => selectedVariations[variation.name]
    );
  }, [product, selectedVariations]);

  const handleSelectVariation = (variationName, selectedOption) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: selectedOption.name,
    }));
    const allVariations = product.product_variation_tempalte.reduce(
      (acc, variation) => {
        const optionForVariation =
          variation.name === variationName
            ? selectedOption.name
            : selectedVariations[variation.name];
        return {
          ...acc,
          [variation.name]: optionForVariation,
        };
      },
      {}
    );
    const matchingCombination = product.product_variation_combination.find(
      (combination) => {
        const isMatching = Object.entries(allVariations).every(
          ([key, value]) => combination.attributes[key] === value
        );
        return isMatching;
      }
    );
    if (matchingCombination) {
      setSelectedCombination({
        id: matchingCombination.attribute_id,
        price: matchingCombination.price || product?.sales_price,
        stock: matchingCombination.stock,
        sku: matchingCombination.sku,
      });
    } else {
      setSelectedCombination({
        id: null,
        price: product?.sales_price,
        stock: 0,
        sku: null,
      });
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, availableStock));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const getAuthToken = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      throw new Error("User data is missing from storage");
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData.token) {
        throw new Error("Authentication token is missing");
      }
      return userData.token;
    } catch (error) {
      console.error("Error parsing user data:", error);
      throw new Error("Invalid user data in storage");
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);

      const cartResponse = await getCartDetails();
      const cartItems = cartResponse.data || [];

      const existingItem = cartItems.find(
        (item) =>
          item.product.id === product.id &&
          item.variant_id === selectedCombination.id
      );

      if (existingItem) {
        const newQuantity = parseFloat(existingItem.quantity) + quantity;

        if (newQuantity > existingItem.stock) {
          setSnackbarSeverity("warning");
          setSnackbarMessage("Cannot exceed available stock");
          setSnackbarOpen(true);
          setIsAddingToCart(false);
          return;
        }

        await updateCartItem({
          card_id: existingItem.card_id,
          quantity: newQuantity?.toString(),
          discount: existingItem.discount,
        });

        setSnackbarSeverity("success");
        setSnackbarMessage("Quantity updated for the selected combination.");
        setSnackbarOpen(true);
      } else {
        const cartItem = {
          product_id: product.id,
          discount: product.discount || "",
          quantity: quantity?.toString(),
          line_discount_type: "percentage",
          variant_id: selectedCombination.id,
          unit_price: selectedCombination?.price?.toString(),
        };

        const userStr = localStorage.getItem("user");
        if (userStr) {
          await addToCart(getAuthToken(), cartItem);
        } else {
          await addToCartGuest(cartItem);
        }

        setSnackbarSeverity("success");
        setSnackbarMessage("Added to cart successfully");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to add to cart");
      setSnackbarOpen(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setIsAddingToCart(true);

      // Check stock
      if (availableStock <= 0) {
        setSnackbarMessage("Sorry, this item is out of stock");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      // Check required variations are selected
      if (product.product_variation_tempalte?.length > 0) {
        const allVariationsSelected =
          Object.keys(selectedVariations).length ===
          product.product_variation_tempalte.length;

        if (!allVariationsSelected) {
          setSnackbarMessage("Please select all variations");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
      }

      const cartItem = {
        product_id: product.id,
        discount: product.discount || "",
        quantity: quantity?.toString(),
        line_discount_type: "percentage",
        unit_price:
          selectedCombination?.price || product?.sales_price?.toString(),
        variant_id: selectedCombination?.id || "",
      };

      const userStr = localStorage.getItem("user");
      if (userStr) {
        await addToCart(getAuthToken(), cartItem);
      } else {
        await addToCartGuest(cartItem);
      }

      // Navigate to checkout
      navigate("/checkout");
    } catch (error) {
      setSnackbarMessage("Failed to process your order");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Product Details...
        </Typography>
      </Box>
    );
  }

  return product ? (
    <Box>
      <Box>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ display: "inline-flex", opacity: 0.8 }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            to={`/products/${product.product_category.id}`}
            component={RouterLink}
          >
            Products
          </Link>
          <Link underline="none" color="inherit">
            {product.name}
          </Link>
        </Breadcrumbs>
      </Box>
      <Box
        padding={{ xs: 1, md: 4 }}
        sx={{ width: { xs: "100%", md: "1300px" }, marginX: "auto" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                image={selectedImage || product.images[0]}
                alt="Selected Product"
                sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                onError={(e) => {
                  console.log(
                    "Current image:",
                    selectedImage || product.images[0]
                  );
                  console.log("All images:", product.images);
                }}
              />
              <Box display="flex" mt={2} gap={1} flexWrap="wrap">
                {product.images.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={image}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      cursor: "pointer",
                      border:
                        selectedImage === image
                          ? "2px solid #1976d2"
                          : "1px solid gray",
                    }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              fontWeight={400}
              fontSize={"36px"}
              gutterBottom
            >
              {product.name}
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              {product.discount ? (
                <>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#2189ff" }}
                    gutterBottom
                  >
                    {product.currency}{" "}
                    {(totalPrice * (1 - product.discount / 100)).toFixed(2)}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#757575",
                      textDecoration: "line-through",
                    }}
                    gutterBottom
                  >
                    {product.currency} {totalPrice}
                  </Typography>
                  <Chip
                    label={`${product.discount}% OFF`}
                    sx={{
                      backgroundColor: "#2189ff",
                      color: "#ffffff",
                      fontWeight: 500,
                      fontSize: "1rem",
                      height: "32px",
                      padding: "0 12px",
                      "& .MuiChip-label": {
                        padding: "0 8px",
                      },
                    }}
                  />
                </>
              ) : (
                <Typography
                  variant="h5"
                  sx={{ color: "#2189ff" }}
                  fontWeight="bold"
                  gutterBottom
                >
                  {product.currency} {totalPrice || 0}
                </Typography>
              )}
            </Box>

            {product.product_variation_tempalte?.length > 0 && (
              <Box sx={{ marginTop: "16px" }}>
                {product.product_variation_tempalte.map((variation, index) => (
                  <Box key={variation.name} sx={{ marginBottom: "32px" }}>
                    <Grid container>
                      <Typography
                        variant="subtitle1"
                        fontWeight="500"
                        gutterBottom
                        pr={2}
                      >
                        {variation.name}:
                      </Typography>
                      {variation.option.map((option) => {
                        const isSelected =
                          selectedVariations[variation.name] === option.name;
                        const isValid = isOptionValid(
                          variation.name,
                          option.name
                        );
                        const isEnabled = isVariationEnabled(index);
                        return (
                          <Grid item key={option.name}>
                            <Chip
                              label={`${option.name}`}
                              sx={{
                                backgroundColor: isSelected
                                  ? "#2189ff"
                                  : isValid && isEnabled
                                  ? "#e0e0e0"
                                  : "#f5f5f5",
                                color: isSelected
                                  ? "#fff"
                                  : isValid && isEnabled
                                  ? "#000"
                                  : "#999",
                                "&:hover":
                                  isValid && isEnabled
                                    ? {
                                        backgroundColor: "#2189ff",
                                        color: "#fff",
                                      }
                                    : undefined,
                              }}
                              onClick={() =>
                                isValid &&
                                isEnabled &&
                                handleSelectVariation(variation.name, option)
                              }
                              disabled={!isValid || !isEnabled}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}

            <Box
              sx={{
                mb: "32px",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{}}>
                <Typography variant="subtitle1" fontWeight="500" pr={2}>
                  Quantity:
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50px",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f5f5f5",
                  overflow: "hidden",
                  width: "130px",
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                  sx={{
                    color: "#000",
                    p: 1,
                    width: "35%",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <RemoveIcon fontSize="small" sx={{ fontWeight: 200 }} />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 0,
                    textAlign: "center",
                    flexGrow: 1,
                    fontSize: "1.25em",
                  }}
                >
                  {availableStock === 0 ? 0 : quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleIncrement}
                  disabled={quantity === availableStock || availableStock === 0}
                  sx={{
                    color: "#000",
                    p: 1,
                    width: "35%",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {product.discount ? (
              <Typography
                mb={"32px"}
                variant="body1"
                color="subtitle1"
                sx={{ marginTop: "16px", fontWeight: "500" }}
              >
                Total Price: {product.currency}{" "}
                {(totalPrice * (1 - product.discount / 100)).toFixed(2)}
              </Typography>
            ) : (
              <Typography
                mb={"32px"}
                variant="body1"
                color="subtitle1"
                sx={{ marginTop: "16px", fontWeight: "500" }}
              >
                Total Price: {product.currency} {totalPrice}
              </Typography>
            )}

            {product.product_brand && (
              <Typography
                mb={"32px"}
                variant="body1"
                sx={{ marginTop: "16px", fontWeight: "500" }}
              >
                Brand: {JSON.parse(product.product_brand.name)?.En}
              </Typography>
            )}
            {product.warranty && (
              <Typography
                mb={"32px"}
                variant="body1"
                sx={{ marginTop: "16px", fontWeight: "500" }}
              >
                Warranty: {JSON.parse(product.warranty.name)?.En}
              </Typography>
            )}

            <Box sx={{ mb: 2, display: "flex" }}>
              <Typography
                variant="body1"
                color={availableStock > 0 ? "green" : "red"}
                sx={{ fontWeight: "500" }}
              >
                {availableStock > 0
                  ? `Stock Available: ${availableStock}`
                  : "Out of Stock"}
              </Typography>
            </Box>

            <Grid
              container
              rowGap={2}
              columnSpacing={{ xs: 0, md: 2 }}
              width={{ xs: "100%", md: "420px" }}
            >
              <Grid item xs={12} md={6}>
                <LoadingButton
                  loading={isAddingToCart}
                  disabled={isAddingToCart || availableStock === 0}
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{ width: "100%" }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to Cart
                </LoadingButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="bluebutton"
                  startIcon={<FavoriteBorderIcon />}
                  onClick={handleAddToWishlist}
                  fullWidth
                  sx={{ flexGrow: 1 }}
                >
                  Add to Wishlist
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="blackbutton"
                  fullWidth
                  sx={{ py: 1, mb: 2 }}
                  disabled={availableStock === 0 || isAddingToCart}
                  onClick={handleBuyNow}
                >
                  {isAddingToCart ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Buy It Now"
                  )}
                </Button>
              </Grid>
            </Grid>

            {/* <Typography color="text.secondary" sx={{ mb: 2 }}>
              <LocalShippingIcon /> Estimated Delivery:{" "}
              {product.estimatedDelivery}
            </Typography> */}

            <Box display="flex" gap={1} alignItems={"center"}>
              <Typography color="text.secondary">Share with us:</Typography>
              <IconButton color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
          <ProductDetailAccordian title={"Specification"}>
            {product.online_description && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: product.online_description,
                  }}
                />
              </Box>
            )}
          </ProductDetailAccordian>

          {product.shipping_info && (
            <ProductDetailAccordian title={"Shipping Information"}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Returns Policy
              </Typography>
              <Typography variant="body1" paragraph>
                You may return most new, unopened items within 30 days of
                delivery for a full refund. We'll also pay the return shipping
                costs if the return is a result of our error (you received an
                incorrect or defective item, etc.).
              </Typography>
              <Typography variant="body1" paragraph>
                You should expect to receive your refund within four weeks of
                giving your package to the return shipper, however, in many
                cases you will receive a refund more quickly. This time period
                includes the transit time for us to receive your return from the
                shipper (5 to 10 business days), the time it takes us to process
                your return once we receive it (3 to 5 business days), and the
                time it takes your bank to process our refund request (5 to 10
                business days).
              </Typography>
              <Typography variant="body1" paragraph>
                If you need to return an item, simply login to your account,
                view the order using the 'Complete Orders' link under the My
                Account menu and click the Return Item(s) button. We'll notify
                you via e-mail of your refund once we've received and processed
                the returned item.
              </Typography>

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ mt: 3 }}
              >
                Shipping
              </Typography>
              <Typography variant="body1" paragraph>
                We can ship to virtually any address in the world. Note that
                there are restrictions on some products, and some products
                cannot be shipped to international destinations.
              </Typography>
              <Typography variant="body1" paragraph>
                When you place an order, we will estimate shipping and delivery
                dates for you based on the availability of your items and the
                shipping options you choose. Depending on the shipping provider
                you choose, shipping date estimates may appear on the shipping
                quotes page.
              </Typography>
              <Typography variant="body1" paragraph>
                Please also note that the shipping rates for many items we sell
                are weight-based. The weight of any such item can be found on
                its detail page. To reflect the policies of the shipping
                companies we use, all weights will be rounded up to the next
                full pound.
              </Typography>
            </ProductDetailAccordian>
          )}

          {product.customer_reviews && (
            <ProductDetailAccordian title={"Reviews"}>
              <Typography variant="h3" fontWeight={500} gutterBottom mt={6}>
                Customer Reviews
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  Based on 1 review
                </Typography>
                <Link
                  href="#"
                  underline="none"
                  color="primary"
                  sx={{
                    fontWeight: 400,
                    color: "text.primary",
                    borderBottom: "2px dotted",
                    transition: "color 0.4s ease-in-out ",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Write a review
                </Link>
              </Box>
            </ProductDetailAccordian>
          )}
        </Box>
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
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h6" color="error">
        Error loading product details. Please try again.
      </Typography>
    </Box>
  );
};

export default ProductDetailsPage;
