import React from "react";
import styles from "../styles/navbar.module.css";
import {
  AppBar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import {
  AccountCircle,
  AccountCircleOutlined,
  ArrowDownward,
  CategoryOutlined,
  ExpandMore,
  Favorite,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  HeartBroken,
  KeyboardArrowDownRounded,
  MonitorHeartOutlined,
  PersonOutlineOutlined,
  PhoneAndroid,
  ShoppingCartOutlined,
  Tv,
} from "@mui/icons-material";

import styled from "@emotion/styled";

import SearchIcon from "@mui/icons-material/Search";

// import Dropdown from "react-multilevel-dropdown";
// import Navmenu from "./navmenu";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sections = [
    {
      image: "https://via.placeholder.com/600x400", // Replace with your image URL
      text: "First Section",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/600x400", // Replace with your image URL
      text: "Second Section",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/600x400", // Replace with your image URL
      text: "Third Section",
      link: "#",
    },
  ];

  return (
    <>
      <AppBar position="static" elevation={0} color="">
        <Grid container alignItems={"center"}>
          <Grid md={"2"}>
            <img src="https://placehold.co/200x40" />
          </Grid>
          <Grid md={"9"}>
            <Stack>
              <TextField
                variant="outlined"
                placeholder="Search for Products..."
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  input: {
                    paddingY: ".6em",
                    borderBlock: "none",
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
            </Stack>
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
              <IconButton>
                <ShoppingCartOutlined />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Grid display={"flex"} paddingY={"1em"}>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#2189ff",
              color: "white",
              borderRadius: "20px", // Adjust for more roundness
              "&:hover": {
                backgroundColor: "#", // Darker shade on hover
              },
              padding: ".5em",
              paddingLeft: "3em",
              paddingRight: "3em",
            }}
            endIcon={<ExpandMore />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            All Categories
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
                Televisons
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

          <Box sx={{ display: "flex", gap: 6 }}>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
            <Link href="#" color="inherit" underline="none">
              Computers
            </Link>
          </Box>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
