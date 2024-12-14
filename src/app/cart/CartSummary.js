import React, { useState } from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShippingEstimate from "./ShippingEstimate";

const CartSummary = ({ total = 0, shipping = 0, tax = 0, cartItems, currency = "$" }) => {
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);


  const handleShippingExpand = () => {
    setIsShippingExpanded(!isShippingExpanded);
  };

  const finalTotal = total + shipping + tax;

  return (
    <Stack
      sx={{
        mt: 3,
        width: "100%",
        bgcolor: "#f8f8f8",
        p: 2,
        borderRadius: 1,
      }}
      alignItems={"flex-start"}
      spacing={2}
    >
      {/* Subtotal Display */}
      <Typography variant="body1" color="primary" sx={{ fontWeight: "bold" }}>
        Subtotal: {currency} {total.toFixed(2)}
      </Typography>

      {shipping > 0 && (
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Shipping: {currency} {shipping.toFixed(2)}
        </Typography>
      )}

      {tax > 0 && (
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Tax: {currency} {tax.toFixed(2)}
        </Typography>
      )}

      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
        Total: {currency} {finalTotal.toFixed(2)}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>


      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "#fff",
          py: 1.5,
        }}
        href="/checkout"
      >
        Checkout ({currency} {finalTotal.toFixed(2)})
      </Button>

      <Button
        variant="contained"
        fullWidth
        endIcon={<ExpandMoreIcon />}
        sx={{
          color: "#fff",
        }}
        onClick={handleShippingExpand}
      >
        Get Shipping Estimates
      </Button>

      <ShippingEstimate expanded={isShippingExpanded} currencyforShipEsti={currency}/>
    </Stack>
  );
};

export default CartSummary;
