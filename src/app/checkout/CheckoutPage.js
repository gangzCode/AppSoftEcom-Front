import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutItem from "./CheckoutItem";
import CheckoutSummary from "./CheckoutSummary";
import { getCartDetails } from "../../services/apiCalls";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartDetails();
        setCartItems(response.data || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleShippingChargeUpdate = (charge) => {
    setShippingCharge(parseFloat(charge) || 0);
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.unit_price) * parseFloat(item.quantity),
    0
  );

  return (
    <Grid
      container
      sx={{ width: { xs: "100%", md: "1300px" }, mx: "auto", my: 6 }}
    >
      <Grid item xs={12} md={6} mr={{ xs: 0, md: 4 }} mb={{ xs: 4, md: 0 }}>
        <CheckoutForm onShippingChargeUpdate={handleShippingChargeUpdate} />
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
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.card_id}>
              <CheckoutItem item={item} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          alignItems={"flex-start"}
          alignContent={"flex-start"}
        >
          <CheckoutSummary total={total} shippingCharge={shippingCharge} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
