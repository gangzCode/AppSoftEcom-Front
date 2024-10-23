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
  InputBase,
  List,
  ListItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import {
  CategoryOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDownRounded,
  Menu,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import styled from "@emotion/styled";

import SearchIcon from "@mui/icons-material/Search";

// import Dropdown from "react-multilevel-dropdown";
// import Navmenu from "./navmenu";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  return (
    <>
      <Grid container className={styles.navContainer}>
        {/* Nav Banner */}
        <Grid
          container
          className={styles.banner}
          alignContent={"center"}
          display={{ xs: "none", xl: "flex" }}
        >
          <Grid
            item
            xs
            className={styles.bannerName}
            display={{ xs: "none", md: "flex" }}
          >
            Gadget For Less
          </Grid>
          <Box className={styles.bannerMiddle}>
            Shipping free for orders over <span>$100</span>!{" "}
            <a href={"/product"}>Shop Now</a>
          </Box>
          <Grid
            container
            item
            xs={3}
            className={styles.bannerRightContainer}
            display={{ xs: "none", md: "flex" }}
          >
            <Grid item xs={6} className={styles.bannerRight}>
              <CallIcon />
              <a href="tel:+14162919800">+1-416-291-9800</a>
            </Grid>
            <Grid item xs={6} className={styles.bannerRight}>
              <EmailIcon />
              <a href="mailto: orders@gadgetforless.ca">
                orders@gadgetforless.ca
              </a>
            </Grid>
          </Grid>
        </Grid>

        {/* Nav Wrapper */}
        <AppBar position="static" style={{ zIndex: 100 }}>
          {/* Upper Navbar */}
          <Toolbar
            className={styles.sample}
            sx={{ justifyContent: "space-between" }}
          >
            <a href={"/"} passHref>
              <Box
                sx={{
                  width: { xs: "80px", sm: "160px", md: "200px" },
                  padding: " 0",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                component="img"
                src="/images/logo-loading.png"
              />
            </a>

            <Stack
              className={styles.headerSearch}
              direction={"row"}
              justifyContent={"center"}
            >
              <InputBase
                sx={{ m: "0px 8px", width: "100%" }}
                placeholder="Search..."
                className={styles.searchInput}
              />
              <IconButton
                sx={{ p: "10px" }}
                aria-label="search"
                className={styles.searchButton}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
            <Stack
              justifyContent={"flex-end"}
              direction={"row"}
              className={styles.menuIcons}
              spacing={2}
              display={{ xs: "none", sm: "flex" }}
            >
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ShoppingCartOutlined />
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <PersonOutlineOutlined className={styles.cartIcon} />
              </Stack>
            </Stack>
          </Toolbar>
          {/* Lower Navbar */}
          <Toolbar
            className={styles.secondToolBar}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box display={{ xs: "none", md: "block" }}>
              {/* <Dropdown
                title={
                  <Typography className={styles.catMenuButtonText}>
                    <CategoryOutlined sx={{ marginRight: 1 }} />
                    Categories
                  </Typography>
                }
                position="right"
                buttonVariant=""
                buttonClassName={styles.catMenuWrapper}
                menuClassName={styles.catMenu}
                openOnHover
              ></Dropdown> */}
            </Box>
            <Stack
              display={{ xs: "block", md: "none" }}
              className={styles.catMenuWrapper}
            >
              <Typography className={styles.catMenuButtonText}>
                <CategoryOutlined sx={{ marginRight: 1 }} />
                Categories
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              className={styles.navigationMenuWrapper}
              justifyContent={"center"}
              alignItems={"center"}
              display={{ xs: "none", md: "flex" }}
            >
              <Typography
                variant="h6"
                component="div"
                className={styles.menuItem}
              >
                <a href={"/"}>Item 1</a>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={styles.menuItem}
              >
                <a href={"/sales?page=1"}>Item2</a>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={styles.menuItem}
              >
                <a href={"/bestseller"}>BEST</a>
              </Typography>
              {/* <Typography variant="h6" component="div" className={styles.menuItem}>
                HELP
              </Typography> */}
              <Typography
                variant="h6"
                component="div"
                className={styles.menuItem}
              >
                <a href={"/contact_us"} passHref>
                  CONTACT US
                </a>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={styles.menuItem}
              >
                <a href={"/contact_us"} passHref>
                  ABOUT US
                </a>
              </Typography>
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }}>
              <IconButton aria-label="navmenu">
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid
        container
        className={styles.mobileNavContainer}
        display={{ xs: "flex", sm: "none" }}
      >
        <Stack
          justifyContent={"space-around"}
          direction={"row"}
          className={styles.menuIconsMobile}
          spacing={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          ></Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <PersonOutlineOutlined className={styles.cartIcon} />
          </Stack>
        </Stack>
      </Grid>

      <div className={styles.backToTop}>
        <KeyboardArrowDownRounded className={styles.upIcon} />
      </div>
      {/* <Navmenu openNavmenu={navmenu} handleClose={toggleNavmenuDrawer(false)} /> */}

      <Dialog
        fullWidth={true}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: { xs: "100vw", md: "85vw" }, // Set your width here
              overflow: "hidden",
              margin: { xs: "12px", md: "32px" },
            },
          },
        }}
        slotProps={{
          backdrop: { style: { backgroundColor: "rgba(0,0,0,0.95)" } },
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      ></Dialog>
    </>
  );
};

export default Navbar;
