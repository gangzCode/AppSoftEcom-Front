import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteOutline } from "@mui/icons-material";

const CartSliderItem = ({ item, onUpdate }) => {
  // const handleQuantityChange = async (newQuantity) => {
  //   try {
  //     await updateCartItemQuantity(item.card_id, newQuantity);
  //     onUpdate();
  //   } catch (error) {
  //     console.error("Failed to update quantity:", error);
  //   }
  // };

  return (
    <Grid container sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}>
      <Grid item xs={3}>
        <Avatar
          variant="rounded"
          src={item.product.images[0]}
          alt={item.product.name}
          sx={{ width: 70, height: 70 }}
        />
      </Grid>
      <Grid item xs={9} px={1}>
        <Box
          sx={{ flexGrow: 1 }}
          display={"flex"}
          flexDirection={"column"}
          gap={0.5}
        >
          <Typography variant="body1" fontWeight={500} lineHeight={1.5}>
            {item.product.name}
          </Typography>
          <Typography variant="body2" fontWeight={400} fontSize={12}>
            {item.variant}
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            ${parseFloat(item.unit_price).toFixed(2)}
          </Typography>
        </Box>
        <Stack direction={"row"} alignItems={"center"} mt={1} gap={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              // onClick={() => handleQuantityChange(parseFloat(item.quantity) - 1)}
              disabled={parseFloat(item.quantity) <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton
              size="small"
              // onClick={() => handleQuantityChange(parseFloat(item.quantity) + 1)}
              disabled={parseFloat(item.quantity) >= item.stock}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton
            size="small"
            // onClick={() => handleQuantityChange(0)}
          >
            <DeleteOutline />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartSliderItem;
