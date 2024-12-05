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

const dummyWishlistItems = [
  {
    id: 1,
    product: {
      id: 1,
      name: "KINGSTON LAPTOP RAM DDR4 3200",
      images: ["https://ecom-test2.yalpos.com/img/default.png"],
      unit_price: "700.00",
      variant: "4GB/124GB",
      stock: 6,
    },
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "HP Laptop 15s",
      images: ["https://ecom-test2.yalpos.com/img/default.png"],
      unit_price: "1200.00",
      variant: "i5/512GB",
      stock: 4,
    },
  },
];

const WishlistDrawer = ({ open, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState(dummyWishlistItems);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    if (open) {
      // fetchWishlist();
    }
  }, [open]);

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
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.product.variant}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    ${item.product.unit_price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleRemoveFromWishlist(item.id)}
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
