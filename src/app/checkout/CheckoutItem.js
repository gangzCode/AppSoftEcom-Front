import React from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material";

function CheckoutItem({ item, currency = "$" }) {
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
        badgeContent={parseFloat(item.quantity)}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mr: 2 }}
      >
        <Avatar
          variant="rounded"
          src={item.product.images[0]}
          alt={item.product.name}
          sx={{ width: 50, height: 50 }}
        />
      </Badge>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          {item?.product?.name.length > 40 ? item?.product?.name.slice(0, 40) + "..." : item?.product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.variant}
        </Typography>
      </Box>

      <Typography variant="body1" fontWeight="bold">
        {currency} {(parseFloat(item.unit_price) * parseFloat(item.quantity)).toFixed(2)}
      </Typography>
    </Box>
  );
}

export default CheckoutItem;
