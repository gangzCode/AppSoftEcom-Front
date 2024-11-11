import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartPage = () => {
  return (
    <Grid
      sx={{ width: { xs: "100%", md: "1300px" }, mx: "auto", my: 6 }}
      // columnSpacing={{ xs: 0, md: 4 }}
      // rowSpacing={{ xs: 4, md: 0 }}
      container
    >
      <Grid
        container
        item
        xs={12}
        rowSpacing={4}
        md={8}
        mr={{ xs: 0, md: 4 }}
        mb={{ xs: 4, md: 0 }}
        alignContent={"flex-start"}
      >
        <Grid item xs={12} sx={{ height: "fit-content" }}>
          <Typography variant="h4" fontSize={30} sx={{ fontWeight: 600 }}>
            Products
          </Typography>
        </Grid>
        <Grid container item rowSpacing={2} xs={12} sx={{ height: "fit-content" }}>
          <Grid item xs={12}>
            <CartItem />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ height: "fit-content" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Button variant="contained">Continue Shopping</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Update Cart</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md alignContent={"flex-start"}>
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={30} sx={{ fontWeight: 600 }}>
            Order Summary
          </Typography>
        </Grid>
        <CartSummary />
      </Grid>
    </Grid>
  );
};

export default CartPage;
