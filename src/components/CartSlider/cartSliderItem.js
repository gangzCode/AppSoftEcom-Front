import { Avatar, Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteOutline } from "@mui/icons-material";

const product = {
  name: "On Ear Bluetooth Headphones",
  description: "Orange / On Ear / Wireless",
  price: 1850.0,
  quantity: 1,
  image: "https://placehold.co/50?text=Headphones", // Replace with actual product image URL
};

const CartSliderItem = () => {
  return (
    <Grid container sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}>
      <Grid item xs={3}>
        <Avatar
          variant="rounded"
          src={product.image}
          alt={product.name}
          sx={{ width: 70, height: 70 }}
        />
      </Grid>
      <Grid item xs={9} px={1}>
        <Box sx={{ flexGrow: 1 }} display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="body1" fontWeight={500} lineHeight={1.5}>
            {product.name}
          </Typography>
          <Typography variant="body2" fontWeight={400} fontSize={12}>
            {product.description}
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            ${product.price.toFixed(2)}
          </Typography>
        </Box>
        <Stack direction={"row"} alignItems={"center"} mt={1} gap={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "50px",
              border: "1px solid #ebebeb",
              backgroundColor: "#f3f3f3",
              overflow: "hidden",
              width: "100px",
            }}
          >
            <IconButton
              size="small"
              // onClick={handleDecrease}
              sx={{
                color: "#000",
                backgroundColor: "#f3f3f3",
                p: 1,
                width: "35%",
                borderRadius: 0,
                transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="body1"
              sx={{
                mx: 0,
                textAlign: "center",
                flexGrow: 1,
                fontSize: "1em",
                backgroundColor: "#f3f3f3",
              }}
            >
              {product.quantity}
            </Typography>
            <IconButton
              size="small"
              // onClick={handleIncrease}
              sx={{
                color: "#000",
                backgroundColor: "#f3f3f3",
                p: 1,
                width: "35%",
                borderRadius: 0,
                transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton size="small">
            <DeleteOutline />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartSliderItem;
