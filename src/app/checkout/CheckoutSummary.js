import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const CheckoutSummary = ({
  total,
  shippingCharge = 0,
  discount = 0,
  currency = "$",
}) => {
  const finalTotal = total + shippingCharge - discount;

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 3, p: 2, borderRadius: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">
          {currency} {total.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1">
          {shippingCharge
            ? `${currency} ${shippingCharge.toFixed(2)}`
            : "Enter shipping address"}
        </Typography>
      </Box>

      {discount > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Discount:</Typography>
          <Typography color="error">
            -{currency} {discount.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Total
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: 0.5 }}
          ></Typography>
          <Typography variant="h6" fontWeight="bold">
            {currency} {finalTotal.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutSummary;
