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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ExpandMore } from "@mui/icons-material";

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

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

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

          <Chip
            label={`Total Price: $${(product.price * quantity).toFixed(2)}`}
            color="primary"
            sx={{ mb: 2 }}
          />

          <Chip
            label={product.availability}
            color={product.availability === "In Stock" ? "success" : "error"}
            sx={{ mb: 2 }}
          />

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

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ py: 1.5, mb: 2 }}
          >
            Buy It Now
          </Button>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Estimated Delivery: {product.estimatedDelivery}
          </Typography>

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

      <Box my={4}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>Specification</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Here you can add details about the product specification.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>Shipping Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Information about shipping can be detailed here.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Add customer reviews or feedback here.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
