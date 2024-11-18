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
import { getProductById } from "../../services/apiCalls";

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
  const [product, setproduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecification, setSelectedSpecification] = useState(
    product.specifications.reduce((acc, spec) => ({ ...acc, [spec]: "" }), {})
  );
  const { id } = useParams();
  // const product = productDetails[id];

  useEffect(() => {
    const fetchGetProductDetails = async () => {
      try {
        const response = await getProductById(id);
        setproduct(response.data);
        console.log("Featured ::::: ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (product.length === 0) {
      fetchGetProductDetails();
    }
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
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

  return (
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
            {product.title}
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
                {product.images.map((img, index) => (
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
                ))}
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
              {product.title}
            </Typography>

            {/* Product Price */}
            <Typography
              variant="h5"
              color="primary"
              fontWeight={"bold"}
              gutterBottom
            >
              ${product.price.toFixed(2)}
            </Typography>

            {/* DESKTOP + WIDESCREEN specifications  */}
            <Table sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
              {product.specifications.map((spec) => (
                <TableRow>
                  <TableCell sx={{ pl: 0 }}>
                    <Typography variant="subtitle1">{spec}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      {spec === "Color"
                        ? product.availableOptions[spec].map((option) => (
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
                                "& .MuiChip-avatar": { width: 12, height: 12 },
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
                          ))
                        : product.availableOptions[spec].map((option) => (
                            <SpecSelectChip
                              key={option}
                              label={option}
                              variant={
                                selectedSpecification[spec] === option
                                  ? "filled"
                                  : "outlined"
                              }
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
                          ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ pl: 0 }}>
                  <Typography variant="subtitle1">Total Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {`$${(product.price * quantity).toFixed(2)}`}
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
                      // onClick={handleDecrease}
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
                      // onClick={handleIncrease}
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
            </Table>

            {/* MOBILE Specifications with Selectable Chips */}
            <Box
              display={{ xs: "flex", md: "none" }}
              mb={2}
              flexDirection={"column"}
            >
              {product.specifications.map((spec) => (
                <Box key={spec} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{spec}</Typography>
                  <Grid container gap={1} mt={1}>
                    {/* {product.availableOptions[spec].map((option) => (
                    <Grid item>
                      <Chip
                        key={option}
                        label={option}
                        clickable
                        color={selectedSpecification[spec] === option ? "primary" : "default"}
                        onClick={() => handleSpecificationChange(spec, option)}
                      />
                    </Grid>
                  ))} */}
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
              ))}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Total Price</Typography>
                <Typography variant="subtitle1">
                  {`$${(product.price * quantity).toFixed(2)}`}
                </Typography>
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
              <Box sx={{ mb: 2 }}>
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
                    // onClick={handleDecrease}
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
                    // onClick={handleIncrease}
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
            <Typography>Quantity:</Typography>
            <ButtonGroup size="small">
              <IconButton onClick={() => handleQuantityChange("decrement")}>
                <RemoveIcon />
              </IconButton>
              <TextField
                variant="outlined"
                size="small"
                value={quantity}
                sx={{ width: 50, textAlign: "center" }}
                inputProps={{ readOnly: true }}
              />
              <IconButton onClick={() => handleQuantityChange("increment")}>
                <AddIcon />
              </IconButton>
            </ButtonGroup>
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
  );
};

export default ProductDetailsPage;
