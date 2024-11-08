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
  Divider,
} from "@mui/material";
import {
  AccountCircleOutlined,
  FavoriteBorderRounded,
  PhoneAndroid,
  ShoppingCartOutlined,
  ExpandMore,
  Tv,
  Close,
  Gamepad,
  Keyboard, // Import Close icon
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import CartSliderItem from "./CartSlider/cartSliderItem";
import CartSliderNotes from "./CartSlider/cartSliderNotes";

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

  const FlipText = styled(Typography)(({ theme }) => ({
    display: "inline-block",
    transition: "transform 0.5s",
    transformOrigin: "center",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&:hover": {
      transform: "rotateY(180deg)",
    },
  }));

  return (
    <>
      <AppBar position="sticky" elevation={0} color="">
        <Grid pt={"2em"} container alignItems={"center"}>
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
            <Box display="flex" justifyContent="space-around" alignItems="center">
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
            sx: { width: { xs: "100%", md: 400 }, p: 4, bgcolor: "#f7f7f7" },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={"row"}
            alignItems="flex-end"
          >
            <Typography variant="h4" fontWeight={"light"} gutterBottom>
              Your Cart
            </Typography>
            <IconButton onClick={toggleCart} color="blackbutton">
              <Close />
            </IconButton>
          </Box>
          <Divider />
          {/* Cart items would go here */}
          <CartSliderItem />
          <CartSliderItem />
          <CartSliderNotes />
          <Box
            sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              ${"1000"}
            </Typography>
          </Box>
          <Typography variant="body1" mt={2} fontSize={14}>
            Shipping, taxes, and discounts will be calculated at checkout.
          </Typography>
          {/* <Typography variant="body2">Cart is currently empty.</Typography> */}
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button variant="contained" color="primary" href="/checkout" onClick={toggleCart}>
              Checkout
            </Button>
            <Button variant="contained" color="primary" href="/cart" onClick={toggleCart}>
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
              "& .MuiPaper-root": {
                borderRadius: "0 0 20px 20px",
                backgroundColor: "#f3f3f3",
              },
            }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Grid
              display={"flex"}
              flexDirection={"column"}
              padding={"1em"}
              gap={"1em"}
              md="4"
              borderRadius={"200px"}
            >
              <MenuItem sx={{}} onClick={handleClose}>
                <PhoneAndroid />
                <Typography paddingLeft={"1em"} fontSize={"16px"} fontWeight={"500"}>
                  Mobiles and Tablets
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tv />
                <Typography paddingLeft={"1em"} fontWeight={"500"} fontSize={"16px"}>
                  Televisions
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Gamepad />
                <Typography paddingLeft={"1em"} fontWeight={"500"} fontSize={"16px"}>
                  Personal Care
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Keyboard />
                <Typography paddingLeft={"1em"} fontWeight={"500"} fontSize={"16px"}>
                  Accessories
                </Typography>
              </MenuItem>
            </Grid>
            {/* <Grid display={"flex"} flexDirection={"row"} padding={"2em"} md="4">
              <Box>
                <Typography fontSize={"14px"} fontWeight={"600"} variant="p">
                  Television
                </Typography>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Notebook Mini Computer
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Chrome Book Laptop
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Notebook Computer
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Two in One Laptop
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Business Smart Laptop
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Touch Screen Mini Laptop
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Ultra Book Personal Laptop
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                  <Typography fontSize={"14px"} variant="p">
                    Ultra Portable Mini Laptop
                  </Typography>
                </MenuItem>
              </Box>
            </Grid> */}
          </Menu>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 10, alignItems: "center" }}>
            <Link
              href="#"
              fontSize={"16px"}
              fontWeight={"500"}
              variant="h5"
              color="inherit"
              underline="none"
              sx={{}}
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
