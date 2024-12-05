import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { clearCart, getCartDetails } from "../../services/apiCalls";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCartDetails();
      setCartItems(response.data);
      console.log(JSON.stringify(cartItems) + "cartItems");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "50vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography color="error">{error}</Typography>
      </Grid>
    );
  }

  return (
    <Grid
      sx={{ width: { xs: "100%", md: "1300px" }, mx: "auto", my: 6 }}
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
            Products ({cartItems.length})
          </Typography>
        </Grid>
        <Grid
          container
          item
          rowSpacing={2}
          xs={12}
          sx={{ height: "fit-content" }}
        >
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.card_id}>
              <CartItem item={item} onQuantityChange={fetchCartItems} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ height: "fit-content" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Button variant="contained" href="/products">
              Continue Shopping
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                try {
                  console.log(JSON.stringify(cartItems) + "cartItems");

                  await clearCart(cartItems.card_id);
                  fetchCartItems();
                } catch (error) {
                  setError("Failed to clear cart");
                }
              }}
            >
              Clear Cart
            </Button>
            <Button variant="contained" onClick={fetchCartItems}>
              Update Cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md alignContent={"flex-start"}>
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={30} sx={{ fontWeight: 600 }}>
            Order Summary
          </Typography>
        </Grid>
        <CartSummary
          total={cartItems.reduce(
            (sum, item) =>
              sum + parseFloat(item.unit_price) * parseFloat(item.quantity),
            0
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CartPage;
