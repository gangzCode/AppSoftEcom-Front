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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const product = {
  title: "Sample Product",
  price: 59.99,
  images: [
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
  ],
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
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleSpecificationChange = (spec, value) => {
    setSelectedSpecification((prev) => ({ ...prev, [spec]: value }));
  };

  return (
    <Box padding={4}>
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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          {/* Product Price */}
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

          {/* Specifications with Selectable Chips */}
          {product.specifications.map((spec) => (
            <Box key={spec} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {spec}
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                {product.availableOptions[spec].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    clickable
                    color={
                      selectedSpecification[spec] === option
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleSpecificationChange(spec, option)}
                  />
                ))}
              </Box>
            </Box>
          ))}

          {/* Total Price with Chip Style */}
          <Chip
            label={`Total Price: $${(product.price * quantity).toFixed(2)}`}
            color="primary"
            sx={{ mb: 2 }}
          />

          {/* Availability */}
          <Chip
            label={product.availability}
            color={product.availability === "In Stock" ? "success" : "error"}
            sx={{ mb: 2 }}
          />

          {/* Quantity Selector */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
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
          </Box>

          {/* Buttons Row */}
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              sx={{ flexGrow: 1 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FavoriteBorderIcon />}
              sx={{ flexGrow: 1 }}
            >
              Add to Wishlist
            </Button>
          </Box>

          {/* Buy Now Button */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ py: 1.5, mb: 2 }}
          >
            Buy It Now
          </Button>

          {/* Estimated Delivery */}
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Estimated Delivery: {product.estimatedDelivery}
          </Typography>

          {/* Share Section */}
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Share with us:
          </Typography>
          <Box display="flex" gap={1}>
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
