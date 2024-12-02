import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
  Drawer,
  Menu,
  MenuItem,
  Divider,
  Paper,
  Grow,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
  Home,
  Person,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import CartSliderItem from "./CartSlider/cartSliderItem";
import CartSliderNotes from "./CartSlider/cartSliderNotes";
import {
  getCategoriesForAllCategoriesDrop,
  getTopCategoriesForMenu,
  quickSearch,
  fetchSystemData,
} from "../services/apiCalls";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  const [anchorCat, setAnchorCat] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menus, setmenus] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const searchBarRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [systemData, setSystemData] = useState({
    logo: "",
  });
  const [bottomValue, setBottomValue] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  let closeMenuTimer;

  const handleProfileClick = () => {
    console.log('user:', user);
    
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSystemData();
        setSystemData({
          logo: data?.logo,
        });
      } catch (error) {
        console.error("Failed to fetch system data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      try {
        const response = await quickSearch(searchTerm);
        const results = response.data;
        console.log("Search Results:", results);
        if (results.length === 0) {
          setSearchResults([
            { message: "No products found for the search term" },
          ]);
        } else {
          setSearchResults(results);
        }
      } catch (error) {
        console.error("Search failed", error);
      }
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      console.log(searchResults);
    }
  }, [searchResults]);

  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setSearchResults([]); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await getCategoriesForAllCategoriesDrop();
        setCategories(response.data);
        console.log("responseee", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) {
      fetchMainCategories();
    }

    const fetchCategoriesMenu = async () => {
      try {
        const response = await getTopCategoriesForMenu();
        setmenus(response.data);
        console.log("responseee menu", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (menus.length === 0) {
      fetchCategoriesMenu();
    }

    return () => {};
  }, []);

  const handleCatClick = async (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleHover = (index) => {
    clearTimeout(closeMenuTimer);
    // console.log(event.currentTarget);

    // setAnchorMenu(event.currentTarget);
    setMenuIndex(index);
  };

  const handleHoverClose = () => {
    closeMenuTimer = setTimeout(() => {
      setAnchorMenu(null);
      setMenuIndex(null);
    }, 150);
  };

  const open = Boolean(anchorCat);

  const handleClose = () => {
    setAnchorCat(null);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // console.log([...Array(5 - 3)]);

  // const menus = [
  //   {
  //     label: "Computers",
  //     items: ["Phones", "Laptops", "Tablets", "Accessories"],
  //   },
  //   {
  //     label: "Electronics",
  //     items: ["Repair", "Consulting", "Support"],
  //   },
  //   {
  //     label: "Computer Parts",
  //     items: ["Our Story", "Careers", "Contact Us"],
  //   },
  //   {
  //     label: "Home Appliance",
  //     items: ["Our Story", "Careers", "Contact Us"],
  //   },
  //   {
  //     label: "Digital Camera",
  //     items: ["Our Story", "Careers", "Contact Us"],
  //   },
  //   {
  //     label: "New Ins",
  //     items: ["Our Story", "Careers", "Contact Us"],
  //   },
  // ];

  const bottomNav = (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "block", md: "none" }, // Hide on desktop
      }}
      elevation={3}
    >
      <BottomNavigation
        // value={bottomValue}
        // onChange={(event, newValue) => {
        //   setBottomValue(newValue);
        // }}
        showLabels
      >
        <BottomNavigationAction onClick={toggleMenu} icon={<MenuIcon />} />
        
        <BottomNavigationAction label="Profile" onClick={handleProfileClick} icon={<Person />} />
      
        <BottomNavigationAction icon={<FavoriteBorderRounded />} />
        <BottomNavigationAction
          onTouchStart={toggleCart}
          icon={
            <Badge badgeContent={4} color="primary">
              <ShoppingCart />
            </Badge>
          }
        />
      </BottomNavigation>
    </Paper>
  );

  return (
    <AppBar position="sticky" elevation={0} color="">
      <Grid pt={"2em"} container alignItems={"center"}>
        <Grid md={2} xs={3}>
          <RouterLink to={"/"}>
            <img src={systemData.logo} alt="Logo" />
          </RouterLink>
        </Grid>
        <Grid md={9} xs={9} sx={{ position: "relative" }}>
          <TextField
            variant="outlined"
            placeholder="Search for Products..."
            fullWidth
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            inputRef={searchBarRef}
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
          {searchResults.length > 0 && (
            <Box
              ref={searchResultsRef}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                bgcolor: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 9999,
                maxHeight: "300px",
                overflowY: "auto",
                marginTop: "8px",
              }}
            >
              <Paper elevation={3}>
                <Typography variant="h6" sx={{ padding: "10px" }}>
                  {searchResults[0].message || "Search Results:"}
                </Typography>
                <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
                  {searchResults[0].message ? (
                    <MenuItem
                      sx={{
                        padding: "10px 20px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <Typography>{searchResults[0].message}</Typography>
                    </MenuItem>
                  ) : (
                    searchResults.map((item) => (
                      <RouterLink to={`/product/${item.id}`} key={item.id}>
                        <MenuItem
                          sx={{
                            padding: "10px 20px",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <Typography>{item.name}</Typography>
                        </MenuItem>
                      </RouterLink>
                    ))
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        </Grid>

        {!isMobile && (
          <Grid md={1}>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton onClick={handleProfileClick}>
                  <AccountCircleOutlined />
              </IconButton>
              <IconButton>
                <RouterLink>
                  <FavoriteBorderRounded />
                </RouterLink>
              </IconButton>
              <IconButton onClick={toggleCart}>
                <RouterLink>
                  <ShoppingCartOutlined />
                </RouterLink>
              </IconButton>
            </Box>
          </Grid>
        )}
      </Grid>

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

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
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
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton onClick={toggleMenu} color="blackbutton">
            <Close />
          </IconButton>
        </Box>
        <List sx={{ width: "100%", mt: 15 }}>
          <Typography variant="h4" fontWeight={"light"} gutterBottom>
            All Categories
          </Typography>
          {categories.map((category) => (
            <div key={category.id}>
              <ListItem
                button
                component={RouterLink}
                to={`/products/${category.id}`}
                onClick={toggleMenu}
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(33, 137, 255, 0.08)",
                  },
                }}
              >
                <img
                  src={category.image}
                  alt={category.name.En}
                  style={{ width: 24, height: 24, marginRight: 12 }}
                />
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      </Drawer>

      <Grid display={"flex"} alignItems={"center"} py={2}>
        {!isMobile && (
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#2189ff",
              boxShadow: "4.243px 4.243px 10px 0px rgb(33 137 255 / 30%)",
              color: "white",
              borderRadius: "20px",
              height: "fit-content",
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
        )}
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
          open={open}
          onClose={handleClose}
        >
          <Grid
            display={"flex"}
            flexDirection={"column"}
            padding={"1em"}
            gap={"1em"}
          >
            {categories.map((category) => (
              <RouterLink to={`/products/${category.id}`}>
                <MenuItem key={category.id} onClick={handleClose}>
                  <img
                    src={category.image} // Use the category's image URL from the API
                    alt={category.name.En} // Alt text using the category name
                    style={{ width: 24, height: 24, marginRight: 12 }} // Adjust image size and margin
                  />
                  <Typography
                    paddingLeft={"1em"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                  >
                    {category.name}
                  </Typography>
                </MenuItem>
              </RouterLink>
            ))}
          </Grid>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            {menus.slice(0, 4).map((menu, index) => (
              <RouterLink to={`/products/${menu.id}`}>
                <Box
                  key={index}
                  onMouseEnter={(e) => handleHover(index)}
                  onMouseLeave={handleHoverClose}
                  sx={{
                    position: "relative",
                    // bgcolor: "primary.main",
                    py: 3,
                    "& .MuiMenu-paper": {
                      opacity: 0,
                      visibility: "hidden",
                      transition: "opacity 0.3s ease, visibility 0.3s ease",
                    },
                  }}
                >
                  <MuiLink
                    href="#"
                    fontSize={"16px"}
                    fontWeight={"500"}
                    variant="h5"
                    color="inherit"
                    underline="none"
                    sx={{
                      "&:hover": {
                        color: "#2189ff",
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {menu.name}
                  </MuiLink>

                  {/* <Menu
                id={`menu-${index}`}
                anchorEl={anchorMenu}
                open={Boolean(anchorMenu) && menuIndex === index}
                // onMouseLeave={handleHoverClose}
                onClose={handleHoverClose}
                // transitionDuration={0.2}

                MenuListProps={{
                  // onMouseEnter: handleMouseEnter,
                  onMouseLeave: handleHoverClose,
                  sx: {
                    pointerEvents: "all",
                  },
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "0 0 20px 20px",
                    backgroundColor: "#f3f3f3",
                    opacity: 1, // Set opacity to 1 when menu is open
                    visibility: "visible",
                    transition: "opacity 0.3s ease", // Smooth transition for submenu
                    pointerEvents: "none",
                  },
                }}
              >
                <Grid display={"flex"} flexDirection={"row"} padding={"2em"} gap={6}>
                  {menu.items.map((item, idx) => (
                    <Box key={idx}>
                      <Typography fontSize={"14px"} fontWeight={"600"} variant="p" mb={"30px"}>
                        {menu.label}
                      </Typography>
                      <MenuItem sx={{ padding: "10px 0" }} onClick={handleClose}>
                        <Typography fontSize={"14px"} variant="p">
                          {item}
                        </Typography>
                      </MenuItem>
                    </Box>
                  ))}
                </Grid>
              </Menu> */}
                </Box>
              </RouterLink>
            ))}
          </Box>
        )}
      </Grid>
      <Box position={"relative"} width={"100%"}>
        {menus.map(
          (menu, index) =>
            menu.sub_category.length > 0 && (
              <Grow in={menuIndex === index}>
                <Box
                  py={4}
                  px={6}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: -25,
                    bgcolor: "#f3f3f3",
                    width: "100%",
                    // display: Boolean(anchorMenu) && menuIndex === index ? "block" : "none",
                    boxShadow: "0 1px 5px rgba(0,0,0,.1)",
                  }}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleHoverClose}
                  // onMouseHover={handleHover}
                >
                  {
                    <Grid container>
                      {menu.sub_category.map((item, idx) => (
                        <Grid item xs={2.4}>
                          <Box key={idx}>
                            <RouterLink to={`/product/${item.id}`}>
                              <Typography
                                fontSize={"14px"}
                                fontWeight={"600"}
                                variant="p"
                                mb={"30px"}
                              >
                                {menu.label}
                              </Typography>
                              <MenuItem
                                sx={{ padding: "10px 0" }}
                                onClick={handleClose}
                              >
                                <Typography fontSize={"14px"} variant="p">
                                  {item.name}
                                </Typography>
                              </MenuItem>
                            </RouterLink>
                          </Box>
                        </Grid>
                      ))}

                      {/* {[...Array(5 - menu.sub_category.length)].map((item, i) => {
                  return (
                    <Grid item xs={2.4}>
                      <Box
                        key={i}
                        component={"img"}
                        src="https://dt-elektrix.myshopify.com/cdn/shop/files/Elektrix_Mega_Menu_3.png?v=1667563640"
                        height={"100%"}
                        width={"auto"}
                      />
                    </Grid>
                  );
                })} */}
                    </Grid>
                  }
                </Box>
              </Grow>
            )
        )}
      </Box>
      {isMobile && bottomNav}
    </AppBar>
  );
};

export default Navbar;
