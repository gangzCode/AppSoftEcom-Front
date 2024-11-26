import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { fetchProductById } from "../../services/apiCalls";
import NotFoundPage from "../../components/404";

const ProductDetailsPage = () => {
  const [product, setproduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://ecom-test2.yalpos.com/img/default.png"
  );
  const [selectedSpecification, setSelectedSpecification] = useState("");
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [selectedVariations, setSelectedVariations] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchGetProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchProductById(productId);
        setproduct(response.data);
        console.log("productbyid ::::: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetProductDetails();
  }, [productId]);

  const calculateTotalPrice = useCallback(() => {
    if (!product || !selectedVariations) return 0;

    let basePrice = 0;

    product.product_variation_tempalte.forEach((variation) => {
      const selectedOption = variation.option.find(
        (opt) => opt.name === selectedVariations[variation.name]
      );
      if (selectedOption?.value) {
        basePrice += parseFloat(selectedOption.value);
      }
    });

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

  const handleSelectVariation = (variationName, option) => {
    const updatedVariations = {
      ...selectedVariations,
      [variationName]: option.name,
    };

    // Keep only valid selections
    const validVariations = Object.fromEntries(
      Object.entries(updatedVariations).filter(([key, value]) =>
        product.product_variation_combination.some((combination) =>
          Object.entries({ ...updatedVariations, [key]: value }).every(
            ([k, v]) => combination.attributes[k] === v
          )
        )
      )
    );

    setSelectedVariations(validVariations);
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, availableStock));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
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

  const {
    name,
    description,
    product_variation_tempalte = [],
    currency,
    thumbnailz,
    images,
  } = product;

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
          <Link underline="hover" color="inherit" href="/products">
            Products
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/products/productsDetail"
          >
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
                image={selectedImage}
                alt="Selected Product"
                sx={{ width: "100%", height: "auto", borderRadius: 2 }}
              />
              <Box display="flex" mt={2} gap={1}>
                <CardMedia
                  key={1}
                  component="img"
                  image={product.image_url}
                  alt={`Thumbnail ${1 + 1}`}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      selectedImage === product.image_url
                        ? "2px solid #1976d2"
                        : "1px solid gray",
                  }}
                  onClick={() => setSelectedImage(product.image_url)}
                />
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

            <Typography variant="h5" fontWeight={"bold"} gutterBottom>
              ${product.price ? product.price : 0}
            </Typography>

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
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleIncrement}
                  disabled={quantity === availableStock}
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

            <Typography
              mb={"32px"}
              variant="body1"
              color="subtitle1"
              sx={{ marginTop: "16px", fontWeight: "500" }}
            >
              Total Price: {product.currency} {totalPrice}
            </Typography>

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
                <Button
                  variant="contained"
                  color="bluebutton"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                  sx={{ flexGrow: 1 }}
                  disabled={availableStock === 0}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="bluebutton"
                  startIcon={<FavoriteBorderIcon />}
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
                  disabled={availableStock === 0}
                >
                  Buy It Now
                </Button>
              </Grid>
            </Grid>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              <LocalShippingIcon /> Estimated Delivery:{" "}
              {product.estimatedDelivery}
            </Typography>

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
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              PRODUCT CATEGORY
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Device Type
                </Typography>
                <Typography variant="body1">Electronic Smart Device</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Processor
                </Typography>
                <Typography variant="body1">Advanced 9nm processor</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Connectivity
                </Typography>
                <Typography variant="body1">Bluetooth 5.0</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Voice Assistant
                </Typography>
                <Typography variant="body1">Google | Siri</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Fast Charging
                </Typography>
                <Typography variant="body1">Yes</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Water Resistant
                </Typography>
                <Typography variant="body1">IPX5 water resistant</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" fontWeight="medium" gutterBottom>
              OTHER INFORMATION
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Warranty
                </Typography>
                <Typography variant="body1">
                  2-years manufacturing Warranty
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Manufacturer
                </Typography>
                <Typography variant="body1">Shopify Theme Developer</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Manufacturer Address
                </Typography>
                <Typography variant="body1">
                  California, United States
                </Typography>
              </Grid>
            </Grid>
          </ProductDetailAccordian>
          <ProductDetailAccordian title={"Shipping Information"}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Returns Policy
            </Typography>
            <Typography variant="body1" paragraph>
              You may return most new, unopened items within 30 days of delivery
              for a full refund. We'll also pay the return shipping costs if the
              return is a result of our error (you received an incorrect or
              defective item, etc.).
            </Typography>
            <Typography variant="body1" paragraph>
              You should expect to receive your refund within four weeks of
              giving your package to the return shipper, however, in many cases
              you will receive a refund more quickly. This time period includes
              the transit time for us to receive your return from the shipper (5
              to 10 business days), the time it takes us to process your return
              once we receive it (3 to 5 business days), and the time it takes
              your bank to process our refund request (5 to 10 business days).
            </Typography>
            <Typography variant="body1" paragraph>
              If you need to return an item, simply login to your account, view
              the order using the 'Complete Orders' link under the My Account
              menu and click the Return Item(s) button. We'll notify you via
              e-mail of your refund once we've received and processed the
              returned item.
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
              We can ship to virtually any address in the world. Note that there
              are restrictions on some products, and some products cannot be
              shipped to international destinations.
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
              are weight-based. The weight of any such item can be found on its
              detail page. To reflect the policies of the shipping companies we
              use, all weights will be rounded up to the next full pound.
            </Typography>
          </ProductDetailAccordian>
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
        </Box>
      </Box>
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
