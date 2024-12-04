import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function CartItem({ item, onQuantityChange }) {
  const [quantity, setQuantity] = useState(parseFloat(item.quantity));
  const pricePerItem = parseFloat(item.unit_price);
  const totalPrice = pricePerItem * quantity;

  const handleIncrease = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
      onQuantityChange && onQuantityChange(item.card_id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange && onQuantityChange(item.card_id, quantity - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#f5f5f5",
        py: 1,
        px: 1,
        borderRadius: 1,
      }}
    >
      <Box
        component="img"
        src={item.product.images[0] || "https://placehold.co/140x200"}
        alt={item.product.name}
        sx={{
          width: { xs: "100%", md: 200 },
          height: { xs: 150, md: 250 },
          borderRadius: 1,
          mx: 4,
        }}
      />

      <Stack
        sx={{ flexGrow: 1, py: 6 }}
        spacing={2}
        direction={"column"}
        alignItems={"flex-start"}
      >
        <Typography sx={{ fontSize: "1.5em", fontWeight: 400 }}>
          {item.product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${item.unit_price}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Variant: {item.variant}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            border: "1px solid #e0e0e0",
            backgroundColor: "#f5f5f5",
            overflow: "hidden",
            width: "130px",
          }}
        >
          <IconButton
            size="small"
            onClick={handleDecrease}
            sx={{
              color: "#000",
              p: 1,
              width: "35%",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <RemoveIcon fontSize="small" sx={{ fontWeight: 200 }} />
          </IconButton>
          <Typography
            variant="body1"
            sx={{
              mx: 0,
              textAlign: "center",
              flexGrow: 1,
              fontSize: "1.25em",
            }}
          >
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={handleIncrease}
            sx={{
              color: "#000",
              p: 1,
              width: "35%",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Button
          size="large"
          startIcon={<DeleteOutlinedIcon />}
          sx={{ mt: 1 }}
          onClick={() => onQuantityChange && onQuantityChange(item.card_id, 0)}
        >
          <Typography sx={{ fontSize: "1.2rem" }}>Remove</Typography>
        </Button>
      </Stack>

      <Box sx={{ textAlign: "right", mt: "auto", background: "#fff", p: 1 }}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}

export default CartItem;
