import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteOutline } from "@mui/icons-material";
import { deleteCartItem, getCartDetails } from "../../services/apiCalls";
import useAppDispatch from "../../hooks/useAppDispatch";
// import { removeItem } from "../../features/cart/cartSlice";

const CartSliderItem = ({ item, onUpdate, onQuantityChange }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCartItem(item.card_id);
      // dispatch(removeItem());
      onUpdate();
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityUpdate = (newQuantity) => {
    setLoading(true);
    onQuantityChange(item, newQuantity);
    setLoading(false);
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCartDetails();
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const currency = item?.product?.currency || "";

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
            {item?.product?.name.length > 70
              ? item?.product?.name.slice(0, 70) + "..."
              : item?.product?.name}
          </Typography>
          <Typography variant="body2" fontWeight={400} fontSize={12}>
            {item.variant}
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {currency} {parseFloat(item.unit_price).toFixed(2)}
          </Typography>
        </Box>
        <Stack direction={"row"} alignItems={"center"} mt={1} gap={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Quantity:</Typography>
            <IconButton
              size="small"
              onClick={() =>
                handleQuantityUpdate(parseFloat(item.quantity) - 1)
              }
              disabled={parseFloat(item.quantity) <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography> {parseFloat(item.quantity)}</Typography>
            <IconButton
              size="small"
              onClick={() =>
                handleQuantityUpdate(parseFloat(item.quantity) + 1)
              }
              disabled={parseFloat(item.quantity) >= item.stock}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton
            size="small"
            onClick={handleDelete}
            disabled={loading}
            color="error"
          >
            <DeleteOutline />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartSliderItem;
