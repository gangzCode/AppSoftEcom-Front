import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const product = {
  title: "Sample Product",
  price: 59.99,
  images: ["https://placehold.co/400", "https://placehold.co/400", "https://placehold.co/400"],
  specifications: ["Color", "Size", "Material"],
  availableOptions: {
    Color: ["Red", "Blue", "Green"],
    Size: ["S", "M", "L", "XL"],
    Material: ["Cotton", "Polyester", "Leather"],
  },
  availability: "In Stock",
  estimatedDelivery: "2-5 Business Days",
};

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecification, setSelectedSpecification] = useState(
    product.specifications.reduce((acc, spec) => ({ ...acc, [spec]: "" }), {})
  );

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleSpecificationChange = (spec, value) => {
    setSelectedSpecification((prev) => ({ ...prev, [spec]: value }));
  };

  return (
    <Box padding={4} sx={{ width: { xs: "100%", md: "1300px" }, marginX: "auto" }}>
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
                    border: selectedImage === img ? "2px solid #1976d2" : "1px solid gray",
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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          {/* Product Price */}
          <Typography variant="h5" color="primary" fontWeight={"bold"} gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

          {/* DESKTOP + WIDESCREEN specifications  */}
          <Table sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
            {product.specifications.map((spec) => (
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {spec}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1} mt={1}>
                    {spec === "Color"
                      ? product.availableOptions[spec].map((option) => (
                          <Chip
                            key={option}
                            label={option}
                            variant="outlined"
                            avatar={
                              <Box
                                sx={{
                                  backgroundColor: option.toLowerCase() + " !important",
                                  borderRadius: 999,
                                  zIndex: 100,
                                }}
                              />
                            }
                            sx={{ borderRadius: 2 }}
                            clickable
                            color={selectedSpecification[spec] === option ? "primary" : "default"}
                            onClick={() => handleSpecificationChange(spec, option)}
                          />
                        ))
                      : product.availableOptions[spec].map((option) => (
                          <Chip
                            key={option}
                            label={option}
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                            clickable
                            color={selectedSpecification[spec] === option ? "primary" : "default"}
                            onClick={() => handleSpecificationChange(spec, option)}
                          />
                        ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  {`$${(product.price * quantity).toFixed(2)}`}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Availability
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle1"
                  color={product.availability === "In Stock" ? "success.dark" : "error"}
                >
                  {product.availability}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Quantity
                </Typography>
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
          <Box display={{ xs: "flex", md: "none" }} mb={2} flexDirection={"column"}>
            {product.specifications.map((spec) => (
              <Box key={spec} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {spec}
                </Typography>
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
                          <Chip
                            key={option}
                            label={option}
                            variant="outlined"
                            avatar={
                              <Box
                                sx={{
                                  backgroundColor: option.toLowerCase() + " !important",
                                  borderRadius: 999,
                                  zIndex: 100,
                                }}
                              />
                            }
                            sx={{ borderRadius: 2 }}
                            clickable
                            color={selectedSpecification[spec] === option ? "primary" : "default"}
                            onClick={() => handleSpecificationChange(spec, option)}
                          />
                        </Grid>
                      ))
                    : product.availableOptions[spec].map((option) => (
                        <Grid item>
                          <Chip
                            key={option}
                            label={option}
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                            clickable
                            color={selectedSpecification[spec] === option ? "primary" : "default"}
                            onClick={() => handleSpecificationChange(spec, option)}
                          />
                        </Grid>
                      ))}
                </Grid>
              </Box>
            ))}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Price
              </Typography>
              <Typography variant="subtitle1">
                {`$${(product.price * quantity).toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Availability
              </Typography>
              <Typography
                variant="subtitle1"
                color={product.availability === "In Stock" ? "success.dark" : "error"}
              >
                {product.availability}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Quantity
              </Typography>
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
          <Grid container spacing={2} width={{ xs: "100%", md: "420px" }}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
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
                color="primary"
                startIcon={<FavoriteBorderIcon />}
                fullWidth
                sx={{ flexGrow: 1 }}
                // sx={{ width: "fit-content", px: 4 }}
              >
                Add to Wishlist
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth sx={{ py: 1.5, mb: 2 }}>
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
            <LocalShippingIcon /> Estimated Delivery: {product.estimatedDelivery}
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
    </Box>
  );
};

export default ProductDetailsPage;