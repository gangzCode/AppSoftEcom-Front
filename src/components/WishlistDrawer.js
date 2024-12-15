import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Drawer,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import { getWishListofUser, deleteWishlistItem } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";

const WishlistDrawer = ({ open, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      fetchWishlist();
    }
  }, [open]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await getWishListofUser();
      setWishlistItems(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleDeleteWishlistItem = async (wishlist_id) => {
    setLoading(true);
    try {
      const response = await deleteWishlistItem(wishlist_id);

      if (response.status === 200) {
        fetchWishlist();
        setSnackbarSeverity("success");
        setSnackbarMessage("Item removed from wishlist");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to remove item");
      setSnackbarOpen(true);
    }
  };

  const handleNavigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

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
        flexDirection="row"
        alignItems="flex-end"
      >
        <Typography variant="h4" fontWeight="light" gutterBottom>
          Your Wishlist ({wishlistItems.length})
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
          {wishlistItems.map((item) => (
            <Grid
              container
              key={item.id}
              sx={{
                mt: 2,
                pb: 2,
                borderBottom: "1px solid #ebebeb",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => handleNavigateToProductDetail(item.id)}
            >
              <Grid item xs={3}>
                <Avatar
                  variant="rounded"
                  src={item.images[0]}
                  alt={item.name}
                  sx={{ width: 70, height: 70 }}
                  onClick={() => handleNavigateToProductDetail(item.id)}
                />
              </Grid>
              <Grid item xs={9} px={1}>
                <Box
                  sx={{ flexGrow: 1 }}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={0.5}
                >
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    lineHeight={1.5}
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {item?.name.length > 70
                      ? item?.name.slice(0, 70) + "..."
                      : item?.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={400} fontSize={12}>
                    {item.variant}
                  </Typography>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {item.currency} {parseFloat(item.sales_price).toFixed(2)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWishlistItem(item.wishlist_id);
                      }}
                      disabled={loading}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          ))}

          {wishlistItems.length === 0 && (
            <Box textAlign="center" my={4}>
              <Typography variant="body1" color="text.secondary">
                Your wishlist is empty
              </Typography>
            </Box>
          )}
        </>
      )}

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
    </Drawer>
  );
};

export default WishlistDrawer;
