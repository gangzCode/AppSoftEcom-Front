import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CartSummary() {
  const subtotal = 3700.0;

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 3,
        textAlign: "center",
      }}
    >
      {/* Subtotal Display */}
      <Typography variant="h6" sx={{ color: "blue", fontWeight: "bold" }}>
        Subtotal : ${subtotal.toFixed(2)}
      </Typography>

      {/* Add Note Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1E90FF",
          color: "#fff",
          mt: 2,
          mb: 2,
          "&:hover": {
            backgroundColor: "#1C86EE",
          },
        }}
        fullWidth
      >
        Add A Note To Your Order
      </Button>

      {/* Information about taxes, shipping, etc. */}
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 2 }}>
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#1E90FF",
          color: "#fff",
          mb: 2,
          "&:hover": {
            backgroundColor: "#1C86EE",
          },
        }}
      >
        Checkout
      </Button>

      {/* Get Shipping Estimates Button */}
      <Button
        variant="contained"
        fullWidth
        endIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#1E90FF",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1C86EE",
          },
        }}
      >
        Get Shipping Estimates
      </Button>
    </Box>
  );
}

export default CartSummary;
