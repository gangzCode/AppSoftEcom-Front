import React from "react";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VoucherInput from "./VoucherInput";

function CartSummary() {
  const subtotal = 3700.0;

  return (
    <Stack
      sx={{
        mt: 3,
        width: "100%",
      }}
      alignItems={"flex-start"}
      // justifyContent={""}
      spacing={2}
    >
      {/* Subtotal Display */}
      <Typography variant="h6" color={"primary"} sx={{ fontWeight: "bold" }}>
        Subtotal : ${subtotal.toFixed(2)}
      </Typography>

      {/* Add Note Button */}
      <Button
        variant="contained"
        sx={{
          color: "#fff",
        }}
      >
        Add A Note To Your Order
      </Button>

      {/* Information about taxes, shipping, etc. */}
      <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>

      <VoucherInput />

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "#fff",
        }} href="/checkout"
      >
        Checkout
      </Button>

      {/* Get Shipping Estimates Button */}
      <Button
        variant="contained"
        fullWidth
        endIcon={<ExpandMoreIcon />}
        sx={{
          color: "#fff",
        }}
      >
        Get Shipping Estimates
      </Button>
    </Stack>
  );
}

export default CartSummary;
