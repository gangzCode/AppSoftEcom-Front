import { Grid, Typography } from "@mui/material";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutItem from "./CheckoutItem";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage = () => {
  return (
    <Grid container sx={{ width: { xs: "100%", md: "1300px" }, mx: "auto", my: 6 }}>
      <Grid item xs={12} md={6} mr={{ xs: 0, md: 4 }} mb={{ xs: 4, md: 0 }}>
        <CheckoutForm />
      </Grid>
      <Grid item container rowGap={2} alignContent={"flex-start"} xs={12} md>
        <Grid item display={{ xs: "block", md: "none" }}>
          <Typography variant="h5">Order Summary</Typography>
        </Grid>
        <Grid
          item
          container
          rowGap={2}
          xs={12}
          alignItems={"flex-start"}
          alignContent={"flex-start"}
        >
          <Grid item xs={12}>
            <CheckoutItem />
          </Grid>
        </Grid>
        <Grid item xs={12} alignItems={"flex-start"} alignContent={"flex-start"}>
          <CheckoutSummary />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
