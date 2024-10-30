import React from "react";
import { Box, Typography, Divider } from "@mui/material";

function CheckoutSummary() {
  const subtotal = 1850.0;
  const shippingPlaceholder = "Enter shipping address";

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 3, p: 2, borderRadius: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1" color="text.secondary">
          {shippingPlaceholder}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Total
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
            USD
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutSummary;
