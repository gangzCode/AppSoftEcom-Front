import React, { useState } from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VoucherInput from "./VoucherInput";
import ShippingEstimate from "./ShippingEstimate";

const CartSummary = ({ total = 0, shipping = 0, tax = 0, cartItems }) => {
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);
  const [orderNote, setOrderNote] = useState(() => {
    return localStorage.getItem('cartNote') || '';
  });

  const handleNotesExpand = () => {
    setIsNotesExpanded(!isNotesExpanded);
  };

  const handleShippingExpand = () => {
    setIsShippingExpanded(!isShippingExpanded);
  };

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setOrderNote(newNote);
    localStorage.setItem('cartNote', newNote);
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
        Subtotal: ${total.toFixed(2)}
      </Typography>

      {shipping > 0 && (
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Shipping: ${shipping.toFixed(2)}
        </Typography>
      )}

      {tax > 0 && (
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Tax: ${tax.toFixed(2)}
        </Typography>
      )}

      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
        Total: ${finalTotal.toFixed(2)}
      </Typography>

      {/* Add Note Button */}
      {!isNotesExpanded ? (
        <Button
          variant="contained"
          sx={{
            color: "#fff",
          }}
          onClick={handleNotesExpand}
        >
          Add A Note To Your Order
        </Button>
      ) : (
        <Box
          sx={{ width: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={1}
        >
          <Typography variant="body1">
            Special instructions for seller
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={7}
            variant="outlined"
            value={orderNote}
            onChange={handleNoteChange}
            sx={{
              bgcolor: "#fff",
              borderRadius: 1,
            }}
          />
        </Box>
      )}

      <Typography variant="body2" color="text.secondary">
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>

      <VoucherInput />

      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "#fff",
          py: 1.5,
        }}
        href="/checkout"
      >
        Checkout (${finalTotal.toFixed(2)})
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

      <ShippingEstimate expanded={isShippingExpanded} />
    </Stack>
  );
}

export default CartSummary;
