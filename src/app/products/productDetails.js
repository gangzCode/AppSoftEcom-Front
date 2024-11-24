import React, { useEffect, useState } from "react";
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

// const product = {
//   title: "Sample Product",
//   price: 59.99,
//   images: [
//     "https://placehold.co/400",
//     "https://placehold.co/400",
//     "https://placehold.co/400",
//   ],
//   specifications: ["Color", "Size", "Material"],
//   availableOptions: {
//     Color: ["Red", "Blue", "Green"],
//     Size: ["S", "M", "L", "XL"],
//     Material: ["Cotton", "Polyester", "Leather"],
//   },
//   availability: "In Stock",
//   estimatedDelivery: "2-5 Business Days",
// };

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

  const handleSelectVariation = (variationName, option) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: option,
    }));
  };

  // const handleQuantityChange = (event) => {
  //   const value = Math.max(1, parseInt(event.target.value, 10) || 1); // Prevent negative or invalid values
  //   setQuantity(value);
  // };

  const calculateTotalPrice = () => {
    const basePrice = Object.values(selectedVariations).reduce(
      (sum, option) => sum + parseFloat(option.value || 0),
      0
    );
    return (basePrice * quantity).toFixed(2);
  };

  // const handleSelectVariation = (variationName, optionName) => {
  //   setSelectedVariations((prev) => ({
  //     ...prev,
  //     [variationName]: optionName,
  //   }));
  // };

  // const product = productDetails[id];

  useEffect(() => {
    console.log(JSON.stringify(selectedVariations) + "selectedVariations");
    return () => {};
  }, [selectedVariations]);

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

  useEffect(() => {
    console.log("productbyid in state", product);

    return () => {};
  }, [product]);

  const handleQuantityChange = (operation) => {
    setQuantity((prev) =>
      operation === "increment" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  const handleSpecificationChange = (spec, value) => {
    setSelectedSpecification((prev) => ({ ...prev, [spec]: value }));
  };

  const SpecSelectChip = styled(Chip)(({ theme, variant }) => ({
    borderRadius: 8,
    borderWidth: 1,
    borderColor:
      variant === "outlined" ? "#7ab8ff" : theme.palette.primary.main,
    color: variant === "outlined" ? "#7ab8ff" : theme.palette.primary,
    fontWeight: 400,
    fontSize: 18,
  }));

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

  // const calculateTotalPrice = () => {
  //   const variationPrice = Object.values(selectedVariations).reduce(
  //     (sum, variation) =>
  //       variation?.variation_decimal
  //         ? sum + parseFloat(variation.variation_decimal)
  //         : sum,
  //     0
  //   );
  //   return product.price ? product.price : 0 + variationPrice * quantity;
  // };

  const handleSelection = (category, option) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

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
          {/* Left Section: Product Images */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                image={selectedImage}
                alt="Selected Product"
                sx={{ width: "100%", height: "auto", borderRadius: 2 }}
              />
              <Box display="flex" mt={2} gap={1}>
                {/* {product.image_url.map((img, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={img}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "2px solid #1976d2"
                          : "1px solid gray",
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))} */}
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

          {/* Right Section: Product Details */}
          <Grid item xs={12} md={6}>
            {/* Product Title */}
            <Typography
              variant="h4"
              fontWeight={400}
              fontSize={"36px"}
              gutterBottom
            >
              {product.name}
            </Typography>

            {/* Product Price */}
            <Typography
              variant="h5"
              // color="primary"
              fontWeight={"bold"}
              gutterBottom
            >
              ${product.price ? product.price : 0}
            </Typography>

            {/* DESKTOP + WIDESCREEN specifications  */}

            {product.product_variation_tempalte?.length > 0 && (
              <Box sx={{ marginTop: "16px" }}>
                {product.product_variation_tempalte.map((variation) => (
                  <Box key={variation.name} sx={{ marginBottom: "32px" }}>
                    <Grid
                      container
                      // spacing={1}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="500"
                        gutterBottom
                        pr={2}
                      >
                        {variation.name}:
                      </Typography>
                      {variation.option.map((option) => (
                        <Grid item key={option.name}>
                          <Chip
                            label={`${option.name}`}
                            sx={{
                              backgroundColor:
                                selectedVariations[variation.name]?.name ===
                                option.name
                                  ? "#2189ff"
                                  : "#e0e0e0",
                              color:
                                selectedVariations[variation.name]?.name ===
                                option.name
                                  ? "#fff"
                                  : "#000",
                              "&:hover": {
                                backgroundColor: "#2189ff",
                                color: "#fff",
                              },
                            }}
                            onClick={() =>
                              handleSelectVariation(variation.name, option)
                            }
                          />
                        </Grid>
                      ))}
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
                <Typography
                  variant="subtitle1"
                  fontWeight="500"
                  // gutterBottom
                  pr={2}
                >
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
                  onClick={() => handleQuantityChange("decrement")}
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
                  onClick={() => handleQuantityChange("increment")}
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
              Total Price: {product.currency} {calculateTotalPrice()}
            </Typography>

            <Box sx={{ mb: 2, display: "flex" }}>
              <Typography pr={1} variant="body1">
                Availability:
              </Typography>
              <Typography
                variant="subtitle1"
                color={product.total_stock > 0 ? "success.dark" : "error"}
              >
                {product.total_stock}
              </Typography>
            </Box>

            {/* <Table sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
              <Box>
                {Object.keys(
                  product.product_variations.reduce((acc, curr) => {
                    acc[curr.template_name] = acc[curr.template_name] || [];
                    acc[curr.template_name].push(curr);
                    return acc;
                  }, {})
                ).map((category) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <TableCell sx={{ pl: 0 }}>
                      <Typography variant="subtitle1">{category}</Typography>
                    </TableCell>
                    <Typography variant="h6" gutterBottom></Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {product.product_variations
                        .filter(
                          (variation) => variation.template_name === category
                        )
                        .map((variation) => (
                          <Chip
                            key={variation.variation_name}
                            label={`${variation.variation_name}`}
                            avatar={
                              variation.variation_color && (
                                <Box
                                  sx={{
                                    backgroundColor:
                                      variation.variation_color.toLowerCase(),
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                  }}
                                />
                              )
                            }
                            color={
                              selectedVariations[category]?.variation_name ===
                              variation.variation_name
                                ? "primary"
                                : "default"
                            }
                            variant={
                              selectedVariations[category]?.variation_name ===
                              variation.variation_name
                                ? "filled"
                                : "outlined"
                            }
                            onClick={() => handleSelection(category, variation)}
                          />
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              <TableRow>
                <TableCell sx={{ pl: 0 }}>
                  <Typography variant="subtitle1">Total Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {calculateTotalPrice().toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 0 }}>
                  <Typography variant="subtitle1">Availability</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    color={
                      product.availability === "In Stock"
                        ? "success.dark"
                        : "error"
                    }
                  >
                    {product.availability}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 0 }}>
                  <Typography variant="subtitle1">Quantity</Typography>
                </TableCell>
                <TableCell>
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
                      onClick={() => handleQuantityChange("decrement")}
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
                      onClick={() => handleQuantityChange("increment")}
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
                </TableCell>
              </TableRow>
            </Table> */}

            {/* MOBILE Specifications with Selectable Chips */}
            <Box
              display={{ xs: "flex", md: "none" }}
              mb={2}
              flexDirection={"column"}
            >
              {/* {product.specifications.map((spec) => (
                <Box key={spec} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{spec}</Typography>
                  <Grid container gap={1} mt={1}>
                    {product.availableOptions[spec].map((option) => (
                      <Grid item>
                        <Chip
                          key={option}
                          label={option}
                          clickable
                          color={
                            selectedSpecification[spec] === option
                              ? "primary"
                              : "default"
                          }
                          onClick={() =>
                            handleSpecificationChange(spec, option)
                          }
                        />
                      </Grid>
                    ))}
                    {spec === "Color"
                      ? product.availableOptions[spec].map((option) => (
                          <Grid item>
                            <SpecSelectChip
                              key={option}
                              label={option}
                              variant={
                                selectedSpecification[spec] === option
                                  ? "filled"
                                  : "outlined"
                              }
                              avatar={
                                <Box
                                  sx={{
                                    backgroundColor:
                                      option.toLowerCase() + " !important",
                                    borderRadius: 999,
                                    filter: "greyscale(80%)",
                                    // zIndex: 100,
                                  }}
                                />
                              }
                              sx={{
                                borderRadius: 0.5,
                                fontSize: 12,
                                ".MuiChip-avatar": { width: 16, height: 16 },
                              }}
                              clickable
                              color={
                                selectedSpecification[spec] === option
                                  ? "primary"
                                  : "default"
                              }
                              onClick={() =>
                                handleSpecificationChange(spec, option)
                              }
                            />
                          </Grid>
                        ))
                      : product.availableOptions[spec].map((option) => (
                          <Grid item>
                            <SpecSelectChip
                              key={option}
                              label={option}
                              variant={
                                selectedSpecification[spec] === option
                                  ? "filled"
                                  : "outlined"
                              }
                              sx={{ borderRadius: 2, borderWidth: 2 }}
                              clickable
                              color={
                                selectedSpecification[spec] === option
                                  ? "primary"
                                  : "default"
                              }
                              onClick={() =>
                                handleSpecificationChange(spec, option)
                              }
                            />
                          </Grid>
                        ))}
                  </Grid>
                </Box>
              ))} */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Total Price</Typography>
                {/* <Typography variant="subtitle1">
                  {`$${(product.price * quantity).toFixed(2)}`}
                </Typography> */}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Availability</Typography>
                <Typography
                  variant="subtitle1"
                  color={
                    product.availability === "In Stock"
                      ? "success.dark"
                      : "error"
                  }
                >
                  {product.availability}
                </Typography>
              </Box>
              {/* <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Quantity</Typography>
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
                    onClick={() => handleQuantityChange("decrement")}
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
                    onClick={() => handleQuantityChange("increment")}
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
              </Box> */}
            </Box>

            {/* Total Price with Chip Style */}
            {/* <Chip
            label={`Total Price: $${(product.price * quantity).toFixed(2)}`}
            color="primary"
            sx={{ mb: 2 }}
          /> */}

            {/* Availability */}
            {/* <Chip
            label={product.availability}
            color={product.availability === "In Stock" ? "success" : "error"}
            sx={{ mb: 2 }}
          /> */}

            {/* Quantity Selector */}
            {/* <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography>Quantity</Typography>
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
                  sx={{
                    color: "#000",
                    p: 1,
                    width: "35%",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                  onClick={() => handleQuantityChange("decrement")}
                >
                  <RemoveIcon />
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
                  sx={{
                    color: "#000",
                    p: 1,
                    width: "35%",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                  onClick={() => handleQuantityChange("increment")}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box> */}

            {/* Buttons Row */}
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
                  // sx={{ width: "fit-content", px: 4 }}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  // variant="outlined"
                  variant="contained"
                  color="bluebutton"
                  startIcon={<FavoriteBorderIcon />}
                  fullWidth
                  sx={{ flexGrow: 1 }}
                  // sx={{ width: "fit-content", px: 4 }}
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
                >
                  Buy It Now
                </Button>
              </Grid>
            </Grid>
            {/* <Box display="flex" gap={2} mb={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              // sx={{ flexGrow: 1 }}
              sx={{ width: "fit-content", px: 4 }}
            >
              Add to Cart
            </Button>
            <Button
              // variant="outlined"
              variant="contained"
              color="primary"
              startIcon={<FavoriteBorderIcon />}
              // sx={{ flexGrow: 1 }}
              sx={{ width: "fit-content", px: 4 }}
            >
              Add to Wishlist
            </Button>
          </Box> */}

            {/* Buy Now Button */}
            {/* <Button variant="contained" color="secondary" fullWidth sx={{ py: 1.5, mb: 2 }}>
            Buy It Now
          </Button> */}

            {/* Estimated Delivery */}
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              <LocalShippingIcon /> Estimated Delivery:{" "}
              {product.estimatedDelivery}
            </Typography>

            {/* Share Section */}
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

        {/* Accordians */}
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

            {/* Other Information */}
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
            {/* Returns Policy Section */}
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

            {/* Shipping Section */}
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
