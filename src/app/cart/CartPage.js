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
import {
  clearCartThunk,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../../features/cart/cartThunks";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../../context/SnackbarContext";

const CartPage = () => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
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
      await dispatch(removeItemFromCart(cardId)).unwrap();
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.card_id !== cardId)
      );
      showSnackbar("Item removed from cart", "success");
    } catch (error) {
      showSnackbar(error?.message || "Failed to remove item", "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [cardId]: false }));
    }
  };

  const handleClearCart = async () => {
    try {
      setClearingCart(true);
      await dispatch(clearCartThunk()).unwrap();
      setCartItems([]);
      showSnackbar("Cart cleared successfully", "success");
    } catch (error) {
      showSnackbar(error?.message || "Failed to clear cart", "error");
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

      showSnackbar("Quantity updated successfully", "success");
    } catch (error) {
      showSnackbar(error?.message || "Failed to update quantity", "error");
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
    <Grid sx={{ width: "100%", mx: "auto", my: 3 }} container>
      <Grid md={8} pr={{ xs: 0, md: 4 }}>
        <TableContainer
          component={Paper}
          sx={{
            mb: 4,
            overflowX: "auto",
            width: { xs: "380px", md: "100%" },
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#2189ff",
              borderRadius: "10px",
            },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: 24, md: 30 }}
            sx={{ p: 2, fontWeight: 600 }}
          >
            Products ({cartItems.length})
          </Typography>

          <Table sx={{ minWidth: { xs: 650, sm: 750, md: "100%" } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 300 }}>Product</TableCell>
                <TableCell align="right" sx={{ minWidth: 100 }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 150 }}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 100 }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  Actions
                </TableCell>
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
                    {item.product.currency}{" "}
                    {parseFloat(item.unit_price).toFixed(2)}
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
                    {item.product.currency}{" "}
                    {(
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

        <Grid
          container
          item
          xs={12}
          sx={{ height: "fit-content" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Button variant="contained" href="/">
              Continue Shopping
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="error" onClick={handleClearCart}>
              Clear Cart
            </Button>
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
