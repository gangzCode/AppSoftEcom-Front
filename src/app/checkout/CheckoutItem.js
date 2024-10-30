import React from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material";

function CheckoutItem() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Badge
        badgeContent={1}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mr: 2 }}
      >
        <Avatar
          variant="rounded"
          src="https://via.placeholder.com/50" // Replace with actual image URL
          alt="On Ear Bluetooth Headphones"
          sx={{ width: 50, height: 50 }}
        />
      </Badge>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          On Ear Bluetooth Headphones
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Orange / On Ear / Wireless
        </Typography>
      </Box>

      <Typography variant="body1" fontWeight="bold">
        $1,850.00
      </Typography>
    </Box>
  );
}

export default CheckoutItem;
