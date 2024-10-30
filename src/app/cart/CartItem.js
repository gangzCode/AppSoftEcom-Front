import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function CartItem() {
  const [quantity, setQuantity] = useState(2);
  const pricePerItem = 1850;
  const totalPrice = pricePerItem * quantity;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        py: 1,
        px: 1,
        borderRadius: 1,
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src="https://via.placeholder.com/140"
        alt="Headphones"
        sx={{
          width: { xs: "100%", md: 140 },
          height: { xs: "100%", md: 140 },
          borderRadius: 1,
          mx: 4,
          // py: 6,
        }}
      />

      {/* Product Details */}
      <Box sx={{ flexGrow: 1, py: 6 }}>
        <Typography variant="h6">On Ear Bluetooth Headphones</Typography>
        <Typography variant="body2" color="text.secondary">
          $1,850.00
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Orange, On Ear, Wireless
        </Typography>

        {/* Quantity Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
          }}
        >
          <IconButton size="small" onClick={handleDecrease}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {quantity}
          </Typography>
          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Remove Button */}
        <Button size="small" startIcon={<RemoveIcon />} sx={{ mt: 1, color: "blue" }}>
          Remove
        </Button>
      </Box>
      {/* Total Price */}

      <Box sx={{ textAlign: "right", mt: "auto", background: "#fff", p: 1 }}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}

export default CartItem;
