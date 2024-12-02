import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { getCartDetails, fetchProductById } from "../../services/apiCalls";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await getCartDetails();
        const itemsWithDetails = await Promise.all(
          cartResponse.data.map(async (item) => {
            const productResponse = await fetchProductById(item.product_id);
            return {
              ...item,
              productDetails: productResponse.data,
            };
          })
        );

        setCartItems(itemsWithDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.productDetails.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 10;
    return subtotal + shipping;
  };

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
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={30} sx={{ fontWeight: 600 }}>
            Products ({cartItems.length})
          </Typography>
        </Grid>

        <Grid container item rowSpacing={2} xs={12}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem
                item={item}
                productDetails={item.productDetails}
                onQuantityChange={handleQuantityChange}
              />
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
        <CartSummary
          items={cartItems}
          onQuantityChange={handleQuantityChange}
        />
      </Grid>
    </Grid>
  );
};

export default CartPage;
