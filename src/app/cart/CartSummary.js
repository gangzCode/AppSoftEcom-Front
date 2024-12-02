import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VoucherInput from "./VoucherInput";
import ShippingEstimate from "./ShippingEstimate";

function CartSummary() {
  const subtotal = 3700.0;

  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);

  const handleNotesExpand = () => {
    setIsNotesExpanded(!isNotesExpanded);
  };

  const handleShippingExpand = () => {
    setIsShippingExpanded(!isShippingExpanded);
  };

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
      <Typography variant="body" color={"primary"} sx={{ fontWeight: "bold" }}>
        Subtotal : ${subtotal.toFixed(2)}
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
            sx={{
              bgcolor: "#f3f3f3",
              borderRadius: 1,
            }}
          />
        </Box>
      )}

      {/* Information about taxes, shipping, etc. */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontStyle: "italic" }}
      >
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>

      <VoucherInput />

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          color: "#fff",
        }}
        href="/checkout"
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
        onClick={handleShippingExpand}
      >
        Get Shipping Estimates
      </Button>

      <ShippingEstimate expanded={isShippingExpanded} />
    </Stack>
  );
}

export default CartSummary;
