import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios"; // Import axios for making API calls
import { getWishListofUser, deleteWishlistItem } from '../services/apiCalls'; // Import the API function for fetching wishlist

const WishlistDrawer = ({ open, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
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
            <Box
              key={item.id}
              sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <img
                  src={item.images[0]} // Use the images from the API response
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.variant}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    ${item.sales_price} {/* Use the sales price from the API */}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleDeleteWishlistItem(item.wishlist_id)} // Bind the delete function
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Box>
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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