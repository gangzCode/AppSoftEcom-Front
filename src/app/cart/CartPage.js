import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import {
  clearCart,
  getCartDetails,
  getIPAddress,
  deleteCartItem,
  updateCartItem,
} from "../../services/apiCalls";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loadingItems, setLoadingItems] = useState({});
  const [clearingCart, setClearingCart] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const ip = await getIPAddress();
        setIpAddress(ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
      }
    };

    fetchIp();
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCartDetails();
      if (!response.data) {
        setCartItems([]);
      } else {
        setCartItems(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (cardId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [cardId]: true }));

      await deleteCartItem(cardId);

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.card_id !== cardId)
      );

      setSnackbarMessage("Item removed from cart");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete item:", error);
      setSnackbarMessage("Failed to remove item");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cardId]: false }));
    }
  };

  const handleClearCart = async () => {
    try {
      setClearingCart(true);
      const savedData = localStorage.getItem("user");
      const user = savedData ? JSON.parse(savedData) : null;
      const token = user?.token;

      if (token) {
        await clearCart(token, null);
      } else if (ipAddress) {
        await clearCart(null, ipAddress);
      } else {
        throw new Error("Unable to clear cart without token or IP address.");
      }

      setSnackbarMessage("Cart cleared successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to clear cart. Please try again.");
      setSnackbarMessage("Failed to clear cart.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setClearingCart(false);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [item.card_id]: true }));

      await updateCartItem({
        card_id: item.card_id,
        quantity: newQuantity.toString(),
        discount: item.discount,
      });

      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.card_id === item.card_id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );

      setSnackbarMessage("Quantity updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setSnackbarMessage("Failed to update quantity");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [item.card_id]: false }));
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
    <Grid sx={{ width: { xs: "100%" }, mx: "auto", my: 6 }} container>
      <Grid md={8} pr={4}>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Typography variant="h4" fontSize={30} sx={{ p: 2, fontWeight: 600 }}>
            Products ({cartItems.length})
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.card_id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {item?.product?.name.length > 20
                            ? item?.product?.name.slice(0, 20) + "..."
                            : item?.product?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.variant}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {item.product.currency} {parseFloat(item.unit_price).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            parseFloat(item.quantity) - 1
                          )
                        }
                        disabled={
                          loadingItems[item.card_id] ||
                          parseFloat(item.quantity) <= 1
                        }
                        sx={{
                          color: "#000",
                          p: 1,
                          width: "25%",
                          borderRadius: 25,
                          "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        variant="body1"
                        sx={{
                          mx: 2,
                          textAlign: "center",
                          fontSize: "1.25em",
                        }}
                      >
                        {loadingItems[item.card_id] ? (
                          <CircularProgress size={20} />
                        ) : (
                          item.quantity
                        )}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            parseFloat(item.quantity) + 1
                          )
                        }
                        disabled={
                          loadingItems[item.card_id] ||
                          parseFloat(item.quantity) >= item.stock
                        }
                        sx={{
                          color: "#000",
                          p: 1,
                          width: "25%",
                          borderRadius: 25,
                          "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {item.product.currency} {(
                      parseFloat(item.unit_price) * parseFloat(item.quantity)
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDeleteItem(item.card_id)}
                      disabled={loadingItems[item.card_id]}
                    >
                      {loadingItems[item.card_id] ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteOutline />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained" href="/">
              Continue Shopping
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 2 }}>
            <LoadingButton
              loading={clearingCart}
              variant="contained"
              color="error"
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid md={4} container item alignContent={"flex-start"}>
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
          currency={cartItems.length > 0 ? cartItems[0].product.currency : "$"}
        />
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CartPage;
