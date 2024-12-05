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
  deleteCartItem,
} from "../../services/apiCalls";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

  const handleDeleteItem = async (cardId) => {
    try {
      setLoading(true);
      await deleteCartItem(cardId);
      fetchCartItems();

      setSnackbarMessage("Item removed from cart");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete item:", error);
      setSnackbarMessage("Failed to remove item");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    try {
      console.log(JSON.stringify(cartItems) + "cartItems");
      await clearCart(cartItems.card_id);
      fetchCartItems();
    } catch (error) {
      setError("Failed to clear cart");
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
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.variant}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ${parseFloat(item.unit_price).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "50px",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#f5f5f5",
                        overflow: "hidden",
                        width: "130px",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>{}}
                        sx={{
                          color: "#000",
                          p: 1,
                          width: "35%",
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" sx={{ fontWeight: 200 }} />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{
                          mx: 0,
                          textAlign: "center",
                          flexGrow: 1,
                          fontSize: "1.25em",
                        }}
                      >
                        {0}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>{}}
                        sx={{
                          color: "#000",
                          p: 1,
                          width: "35%",
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    $
                    {(
                      parseFloat(item.unit_price) * parseFloat(item.quantity)
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDeleteItem(item.card_id)}
                      disabled={loading}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained" href="/products">
              Continue Shopping
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="error" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button variant="contained" onClick={fetchCartItems}>
              Update Cart
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
        />
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
