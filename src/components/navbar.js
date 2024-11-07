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
  Close,
  Gamepad,
  Keyboard,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  const [anchorCat, setAnchorCat] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  let closeMenuTimer;

  const handleHover = (event, index) => {
    clearTimeout(closeMenuTimer);
    setAnchorMenu(event.currentTarget);
    setMenuIndex(index);
  };

  const handleHoverClose = () => {
    closeMenuTimer = setTimeout(() => {
      setAnchorMenu(null);
      setMenuIndex(null);
    }, 100);
  };

  const open = Boolean(anchorCat);
  const handleCatClick = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorCat(null);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const menus = [
    {
      label: "Computers",
      items: ["Phones", "Laptops", "Tablets", "Accessories"],
    },
    {
      label: "Electronics",
      items: ["Repair", "Consulting", "Support"],
    },
    {
      label: "Computer Parts",
      items: ["Our Story", "Careers", "Contact Us"],
    },
    {
      label: "Home Appliance",
      items: ["Our Story", "Careers", "Contact Us"],
    },
    {
      label: "Digital Camera",
      items: ["Our Story", "Careers", "Contact Us"],
    },
    {
      label: "New Ins",
      items: ["Our Story", "Careers", "Contact Us"],
    },
  ];

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
            onClick={handleCatClick}
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
            anchorEl={anchorCat}
            anc
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
                <Typography
                  paddingLeft={"1em"}
                  fontSize={"16px"}
                  fontWeight={"500"}
                >
                  Mobiles and Tablets
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tv />
                <Typography
                  paddingLeft={"1em"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                >
                  Televisions
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Gamepad />
                <Typography
                  paddingLeft={"1em"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                >
                  Personal Care
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Keyboard />
                <Typography
                  paddingLeft={"1em"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                >
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

          {/* <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
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

            <Menu
              sx={{
                width: "100%",
                "& .MuiPaper-root": {
                  borderRadius: "0 0 20px 20px",
                  backgroundColor: "#f3f3f3",
                },
              }}
              id="basic-menu"
              anchorEl={anchorMenu}
              open={Boolean(anchorMenu)}
              onClose={handleHoverClose}
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
                <MenuItem
                  sx={{}}
                >
                  <PhoneAndroid />
                  <Typography
                    paddingLeft={"1em"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                  >
                    Mobiles and Tablets
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Tv />
                  <Typography
                    paddingLeft={"1em"}
                    fontWeight={"500"}
                    fontSize={"16px"}
                  >
                    Televisions
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Gamepad />
                  <Typography
                    paddingLeft={"1em"}
                    fontWeight={"500"}
                    fontSize={"16px"}
                  >
                    Personal Care
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Keyboard />
                  <Typography
                    paddingLeft={"1em"}
                    fontWeight={"500"}
                    fontSize={"16px"}
                  >
                    Accessories
                  </Typography>
                </MenuItem>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"row"}
                padding={"2em"}
                md="4"
              >
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
              </Grid>
            </Menu>

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
          </Box> */}

          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            {menus.map((menu, index) => (
              <Box
                key={index}
                onMouseEnter={(e) => handleHover(e, index)}
                onMouseLeave={handleHoverClose}
              >
                <Link
                  href="#"
                  fontSize={"16px"}
                  fontWeight={"500"}
                  variant="h5"
                  color="inherit"
                  underline="none"
                  sx={{}}
                >
                  {menu.label}
                </Link>

                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorMenu}
                  open={Boolean(anchorMenu) && menuIndex === index}
                  onClose={handleHoverClose}
                  MenuListProps={{ onMouseLeave: handleHoverClose }}
                >
                  {/* {menu.items.map((item, idx) => (
                    <MenuItem key={idx} onClick={handleHoverClose}>
                      {item}
                    </MenuItem>
                  ))} */}

                  <Grid
                    display={"flex"}
                    flexDirection={"row"}
                    padding={"2em"}
                    gap={6}
                    md="4"
                  >
                    <Box>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={"600"}
                        variant="p"
                        mb={"30px"}
                      >
                        Television
                      </Typography>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Mini Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Chrome Book Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Two in One Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Business Smart Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Touch Screen Mini Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Book Personal Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Portable Mini Laptop
                        </Typography>
                      </MenuItem>
                    </Box>
                    <Box>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={"600"}
                        variant="p"
                      >
                        Television
                      </Typography>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Mini Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Chrome Book Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Two in One Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Business Smart Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Touch Screen Mini Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Book Personal Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Portable Mini Laptop
                        </Typography>
                      </MenuItem>
                    </Box>
                    <Box>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={"600"}
                        variant="p"
                      >
                        Television
                      </Typography>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Mini Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Chrome Book Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Two in One Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Business Smart Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Touch Screen Mini Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Book Personal Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Portable Mini Laptop
                        </Typography>
                      </MenuItem>
                    </Box>
                    <Box>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={"600"}
                        variant="p"
                      >
                        Television
                      </Typography>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Mini Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Chrome Book Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Two in One Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Business Smart Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Touch Screen Mini Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Book Personal Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Portable Mini Laptop
                        </Typography>
                      </MenuItem>
                    </Box>
                    <Box>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={"600"}
                        variant="p"
                      >
                        Television
                      </Typography>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Mini Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Chrome Book Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Notebook Computer
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Two in One Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Business Smart Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Touch Screen Mini Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Book Personal Laptop
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ padding: "10px 0" }}
                        onClick={handleClose}
                      >
                        <Typography fontSize={"14px"} variant="p">
                          Ultra Portable Mini Laptop
                        </Typography>
                      </MenuItem>
                    </Box>
                  </Grid>
                </Menu>
              </Box>
            ))}
          </Box>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
