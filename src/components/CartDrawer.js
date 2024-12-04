import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import CartSliderItem from "./CartSlider/cartSliderItem";
import CartSliderNotes from "./CartSlider/cartSliderNotes";
import { getCartDetails } from "../services/apiCalls";

const CartDrawer = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (open) {
      fetchCart();
    }
  }, [open]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.unit_price) * parseFloat(item.quantity),
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", md: 400 }, p: 4, bgcolor: "#f7f7f7" },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={"row"}
        alignItems="flex-end"
      >
        <Typography variant="h4" fontWeight={"light"} gutterBottom>
          Your Cart ({cartItems.length})
        </Typography>
        <IconButton onClick={onClose} color="blackbutton">
          <Close />
        </IconButton>
      </Box>
      <Divider />

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartSliderItem
              key={item.card_id}
              item={item}
              onUpdate={fetchCart}
            />
          ))}
        </>
      )}

      <CartSliderNotes />

      <Box
        sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>
      <Typography variant="body1" mt={2} fontSize={14}>
        Shipping, taxes, and discounts will be calculated at checkout.
      </Typography>

      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          href="/checkout"
          onClick={onClose}
        >
          Checkout
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="/cart"
          onClick={onClose}
        >
          View Cart
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
