import { Grid } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartPage = () => {
  return (
    <Grid sx={{ width: { xs: "100%", md: "1280px" }, mx: "auto", my: 6 }} spacing={2} container>
      <Grid item xs={12} md={8}>
        Products
        <CartItem />
      </Grid>
      <Grid item xs={12} md={4}>
        Order Summary
        <CartSummary />
      </Grid>
    </Grid>
  );
};

export default CartPage;
