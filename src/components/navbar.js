import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountCircleOutlined,
  FavoriteBorderRounded,
  PhoneAndroid,
  ShoppingCartOutlined,
  ExpandMore,
  Tv,
  Close, // Import Close icon
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false); // New state for cart slider

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const sections = [
    {
      image: "https://via.placeholder.com/600x400",
      text: "First Section",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/600x400",
      text: "Second Section",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/600x400",
      text: "Third Section",
      link: "#",
    },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={0} color="">
        <Grid container alignItems={"center"}>
          <Grid md={"2"}>
            <img src="https://placehold.co/200x40" alt="Logo" />
          </Grid>
          <Grid md={"9"}>
            <TextField
              variant="outlined"
              placeholder="Search for Products..."
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "#f3f3f3",
                },
                input: {
                  paddingY: ".6em",
                  borderBlock: "none",
                  backgroundColor: "#f3f3f3",
                  borderRadius: "50px",
                },
                fieldset: {
                  border: "none",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid md={"1"}>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton>
                <AccountCircleOutlined />
              </IconButton>
              <IconButton>
                <FavoriteBorderRounded />
              </IconButton>
              <IconButton onClick={toggleCart}>
                <ShoppingCartOutlined />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Drawer for the Cart Sidebar */}
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={toggleCart}
          PaperProps={{
            sx: { width: 300, padding: 2, bgcolor: "#f7f7f7" },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" gutterBottom>
              Your Cart
            </Typography>
            <IconButton onClick={toggleCart}>
              <Close />
            </IconButton>
          </Box>
          {/* Cart items would go here */}
          <Typography variant="body2">Cart is currently empty.</Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              href="/checkout"
              onClick={toggleCart}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="/cart"
              onClick={toggleCart}
            >
              View Cart
            </Button>
          </Box>
        </Drawer>

        <Grid display={"flex"} paddingY={"2em"}>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#2189ff",
              boxShadow: "4.243px 4.243px 10px 0px rgb(33 137 255 / 30%)",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#1a76d2",
              },
              padding: ".7em 4em",
            }}
            endIcon={<ExpandMore />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography variant="h5" fontSize={"16px"} fontWeight={"500"}>
              All Categories
            </Typography>
          </Button>
          <Menu
            sx={{
              width: "100%",
            }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <PhoneAndroid />
              <Typography paddingLeft={".2em"} fontSize={"19px"} variant="p">
                Mobiles and Tablets
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Tv />
              <Typography paddingLeft={".2em"} fontSize={"19px"} variant="p">
                Televisions
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <PhoneAndroid />
              <Typography paddingLeft={".2em"} fontSize={"19px"} variant="p">
                Mobiles and Tablets
              </Typography>
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              Computers
            </Link>

            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              Electronics
            </Link>

            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              Computer Parts
            </Link>

            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              Home Appliance
            </Link>

            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              Digital Camera
            </Link>
            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
            >
              New ins
            </Link>
          </Box>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
