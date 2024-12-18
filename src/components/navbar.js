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
  Collapse,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

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
import {
  getCategoriesForAllCategoriesDrop,
  getTopCategoriesForMenu,
  quickSearch,
  fetchSystemData,
  getCartDetails,
  getWishListofUser,
} from "../services/apiCalls";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchCartItems } from "../features/cart/cartThunks";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist } from "../features/wishlist/wishlistThunks";

const Navbar = ({ refreshCart, onRemove }) => {
  const dispatch = useDispatch();
  const { count: wishlistCount, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { items, cartCount, loading } = useAppSelector((state) => state.cart);

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
  const [expandedMenu, setExpandedMenu] = useState(null);

  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  let closeMenuTimer;

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (cartOpen) {
      dispatch(fetchCartItems());
    }
  }, [cartOpen, dispatch]);

  useEffect(() => {
    console.log("cartCount FROM Navbar ", cartCount);
  }, [cartCount]);

  const handleProfileClick = () => {
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

  const toggleWishlist = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
    } else {
      setWishlistOpen(!wishlistOpen);
    }
  };

  const handleMenuExpand = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
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
        display: { md: "none" },
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={bottomValue}
        onChange={(event, newValue) => setBottomValue(newValue)}
        sx={{
          height: { xs: "56px", sm: "64px" },
          "& .MuiBottomNavigationAction-root": {
            minWidth: { xs: "auto", sm: "80px" },
            padding: { xs: "6px", sm: "8px" },
          },
        }}
      >
        <BottomNavigationAction onClick={toggleMenu} icon={<MenuIcon />} />

        <BottomNavigationAction
          onClick={handleProfileClick}
          icon={<Person />}
        />

        <BottomNavigationAction
          onClick={toggleWishlist}
          icon={
            <Badge badgeContent={wishlistCount} color="primary">
              <FavoriteBorderRounded />
            </Badge>
          }
        />
        {!isCheckoutPage && (
          <BottomNavigationAction
            onClick={toggleCart}
            icon={
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCart />
              </Badge>
            }
          />
        )}
      </BottomNavigation>
    </Paper>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        paddingX: {
          xs: "1em",
          sm: "2em",
          md: "2em",
          lg: "6em",
          xl: "8em",
        },
        marginBottom: {
          xs: "56px",
          sm: "64px",
          md: "0",
        },
      }}
      elevation={0}
      color=""
    >
      <Grid
        pt={{ xs: "1em", sm: "1.5em", md: "2em" }}
        container
        alignItems="center"
      >
        <Grid item xs={3} sm={2} md={2}>
          <RouterLink to={"/"}>
            <img
              src={systemData.logo}
              alt="Logo"
              style={{
                width: "120px",
                height: "auto",
              }}
            />
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
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <IconButton onClick={handleProfileClick}>
                <AccountCircleOutlined />
              </IconButton>
              <IconButton onClick={toggleWishlist}>
                <Badge
                  badgeContent={wishlistLoading ? "..." : wishlistCount}
                  color="primary"
                >
                  <FavoriteBorderRounded />
                </Badge>
              </IconButton>
              {!isCheckoutPage && (
                <IconButton onClick={toggleCart}>
                  <Badge
                    badgeContent={loading ? "..." : cartCount}
                    color="primary"
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                </IconButton>
              )}
            </Box>
          </Grid>
        )}
      </Grid>

      <CartDrawer open={cartOpen} onClose={toggleCart} />
      <WishlistDrawer open={wishlistOpen} onClose={toggleWishlist} />

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
            Menus
          </Typography>
          {menus.map((menu) => (
            <div key={menu.id}>
              <Box display={"flex"} alignItems={"center"}>
                <ListItem
                  button
                  component={RouterLink}
                  to={`/products/${menu.id}`}
                  onClick={toggleMenu}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "rgba(33, 137, 255, 0.08)",
                    },
                  }}
                >
                  <ListItemText
                    primary={menu.name}
                    primaryTypographyProps={{
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                {menu.sub_category?.length > 0 && (
                  <ExpandMore
                    onClick={() => handleMenuExpand(menu.id)}
                    sx={{
                      transform:
                        expandedMenu === menu.id ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s",
                    }}
                  />
                )}
              </Box>

              <Collapse in={expandedMenu === menu.id}>
                <List component="div" disablePadding>
                  {menu.sub_category?.map((subCat) => (
                    <ListItem
                      key={subCat.id}
                      button
                      component={RouterLink}
                      to={`/products/${menu.id}?sub=${subCat.id}`}
                      onClick={toggleMenu}
                      sx={{
                        pl: 4,
                        py: 1,
                        "&:hover": {
                          bgcolor: "rgba(33, 137, 255, 0.04)",
                        },
                      }}
                    >
                      <ListItemText
                        primary={subCat.name}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          color: "text.secondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      </Drawer>

      {!isMobile && (
        <Grid display={"flex"} alignItems={"center"} py={2}>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#2189ff",
              boxShadow: "4.243px 4.243px 10px 0px rgb(33 137 255 / 30%)",
              color: "white",
              borderRadius: "20px",
              width: { lg: "300px", md: "auto" },
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

          <Box
            sx={{
              display: "flex",
              gap: { md: 0, lg: 10 },
              alignItems: "center",
              justifyContent: "flex-end",
              width: { xl: "100%", lg: "840px", md: "580px", sm: "100%" },
            }}
          >
            {menus.slice(0, 4).map((menu, index) => (
              <RouterLink to={`/products/${menu.id}`}>
                <Box
                  key={index}
                  onMouseEnter={(e) => handleHover(index)}
                  onMouseLeave={handleHoverClose}
                  sx={{
                    position: "relative",
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
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "inherit",
                      textDecoration: "none",
                      transition: "all 0.5s ease",
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                      "&::before": {
                        content: `"${menu.name}"`,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        color: "#2189ff",
                        opacity: 0,
                        transform: "rotateX(180deg)",
                        transition: "all 0.5s ease",
                        backfaceVisibility: "hidden",
                        transformOrigin: "center center",
                      },
                      "&:hover": {
                        transform: "rotateX(180deg)",
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "& span": {
                        display: "inline-block",
                        backfaceVisibility: "hidden",
                      },
                    }}
                  >
                    <span>{menu.name}</span>
                  </MuiLink>
                </Box>
              </RouterLink>
            ))}
          </Box>
        </Grid>
      )}

      <Box position={"relative"} width={"100%"}>
        {menus.map(
          (menu, index) =>
            menu.is_sub_category &&
            menu.sub_category.length > 0 && (
              <Grow in={menuIndex === index} key={menu.id}>
                <Box
                  py={4}
                  px={6}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: -25,
                    bgcolor: "#f3f3f3",
                    width: "100%",
                    boxShadow: "0 1px 5px rgba(0,0,0,.1)",
                  }}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleHoverClose}
                >
                  <Grid container>
                    {menu.sub_category.slice(0, 5).map((sub, idx) => (
                      <Grid item xs={2.4} key={sub.id}>
                        <Box>
                          <RouterLink
                            to={`/products/${menu.id}`}
                            state={{
                              subcategoryId: sub.id,
                              subcategoryName: sub.name,
                            }}
                          >
                            <Typography
                              fontSize={"14px"}
                              fontWeight={"600"}
                              variant="p"
                              mb={"30px"}
                            >
                              {sub.name}
                            </Typography>
                          </RouterLink>
                          {sub.products.length > 0 ? (
                            sub.products.map((product, productIdx) => (
                              <MenuItem
                                sx={{ padding: "10px 0" }}
                                key={product.id || productIdx}
                                onClick={handleClose}
                              >
                                <RouterLink
                                  to={`/product/${product.id}`}
                                  state={{
                                    subcategoryId: product.id,
                                    subcategoryName: product.name,
                                  }}
                                >
                                  <Typography fontSize={"14px"} variant="p">
                                    {product?.name.length > 20
                                      ? product?.name.slice(0, 20) + "..."
                                      : product?.name}
                                  </Typography>
                                </RouterLink>
                              </MenuItem>
                            ))
                          ) : (
                            <Typography
                              fontSize={"14px"}
                              variant="p"
                              color="gray"
                            >
                              No products available
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    ))}

                    {menu.sub_category.length < 5 &&
                      Array.from({
                        length: 5 - menu.sub_category.length,
                      }).map((_, fillIndex) => {
                        // Use modulo to cycle through images if there are multiple images
                        const imageSrc =
                          menu.images[fillIndex % menu.images.length] ||
                          "https://ecom-test2.yalpos.com/img/default.png";

                        return (
                          <Grid item xs={2.4} key={`fill-${fillIndex}`}>
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={imageSrc}
                                alt={menu.name}
                                height={"260px"}
                                width={"241px"}
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                  </Grid>
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
