import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CartItem = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(parseFloat(item.quantity));
  const variantIds = item.variant_id.split(",");
  const price = parseFloat(item.unit_price);
  const totalPrice = price * quantity;

  const handleIncrease = () => {
    if (quantity < item.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  useEffect(() => {
    console.log("Item updated", item.productDetails.thumbnailz);

    return () => {};
  }, [item]);

  return (
    <Grid container spacing={2} sx={{ bgcolor: "#fff", p: 2, borderRadius: 1 }}>
      <Grid item xs={12} md={2}>
        <Box
          component="img"
          src={item.productDetails.thumbnailz || "placeholder.jpg"}
          alt={item.product_name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      </Grid>

      <Grid item xs={12} md={10}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{item.product_name}</Typography>
            <IconButton color="error">
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Variant: {item.variant}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleDecrease} disabled={quantity === 1}>
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton
              onClick={handleIncrease}
              disabled={quantity >= item.stock}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Price: ${price.toFixed(2)}</Typography>
            <Typography variant="body1">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartItem;
