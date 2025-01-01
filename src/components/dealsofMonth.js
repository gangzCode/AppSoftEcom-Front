import {
  ChevronRight,
  Favorite,
  Layers,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect,useContext } from "react";
import {
  addToWishlist,
  getCartDetails,
  getDealsofMonthProducts,
} from "../services/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import { addItemToCart } from "../features/cart/cartThunks";
import useAppSelector from "../hooks/useAppSelector";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../features/wishlist/wishlistThunks";
import { useDispatch } from "react-redux";
import { useTranslation } from "../hooks/useTranslation";
import { CurrencyContext } from "../context/CurrencyContext";

const DealsofMonth = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState({});
  const { items: wishlistItems, loading: wishlistLoading } = useAppSelector(
    (state) => state.wishlist
  );
  const translate = useTranslation();
  const { selectedCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const response = await getDealsofMonthProducts();
        setTitle(response?.title);
        setSubTitle(response?.sub_title);
        const filteredProducts = (response?.data || []).filter(
          (product) => product.top_status === 1
        );
        setFilteredProducts(filteredProducts);
        setProducts(response.data);
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
        console.error("Error fetching products:", error);
      }
    };

    fetchGetProducts();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product) => {
    try {
      // Check stock
      if (product.total_stock <= 0) {
        showSnackbar("Sorry, this item is out of stock", "error");
        return;
      }

      // Check for variations
      if (product.product_variation_combination?.length > 0) {
        navigate(`/product/${product.id}`);
        return;
      }

      setAddingToCartId(product.id);

      const cartResponse = await getCartDetails();
      const cartItems = cartResponse.data || [];

      const existingItem = cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        showSnackbar(
          "Item already in cart. Please update quantity in cart.",
          "error"
        );
        return;
      }

      // Add new item to cart
      const cartItem = {
        product_id: product.id,
        discount: product.discount || "",
        quantity: "1",
        line_discount_type: "percentage",
        unit_price: product.sales_price.toString(),
      };

      await dispatch(addItemToCart(cartItem)).unwrap();
      showSnackbar("Added to cart successfully", "success");
    } catch (error) {
      console.error("Failed to add to cart:", error);

      showSnackbar("Failed to add to cart", "error");
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleAddToWishlist = async (product) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
      return;
    }

    if (isInWishlist[product.id]) {
      showSnackbar("This product is already in your wishlist!", "info");
      return;
    }

    try {
      await addToWishlist(product.id);
      setIsInWishlist((prev) => ({
        ...prev,
        [product.id]: true,
      }));
      showSnackbar("Added to wishlist successfully", "success");
    } catch (error) {
      showSnackbar("Failed to add to wishlist", "error");
    }
  };

  return (
    <Box sx={{ padding: "40px 0", margin: "4em 0 1em" }}>
      <Typography
        variant="p"
        fontSize={"12px"}
        color={"#1e1e1e"}
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            marginLeft: "1em",
            transform: "translateY(-50%)",
            width: "150px",
            height: "2px",
            backgroundColor: "#2189ff",
          },
        }}
      >
        {subTitle}
      </Typography>
      <Typography
        onClick={() =>
          navigate("/custom-products", {
            state: { title, products: products },
          })
        }
        variant="h4"
        fontWeight={"600"}
        component="h2"
        gutterBottom
        width={"fit-content"}
        sx={{
          cursor: "pointer",
          transition: "color 0.3s ease",
          fontSize: { xs: "24px", sm: "32px", md: "40px" },
          "&:hover": {
            color: "#2189ff",
          },
        }}
      >
        {title}
      </Typography>
      <Box sx={{ padding: "40px 0" }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "678px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#fff",
                flexGrow: 1,
                position: "relative", // To position chips correctly within the Box
              }}
              onClick={() => handleCardClick(products[0]?.id)}
            >
              <Box
                component="img"
                src={filteredProducts[0]?.thumbnailz}
                alt={filteredProducts[0]?.name}
                sx={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                }}
              />
              {filteredProducts[0]?.soldOut && (
                <Chip
                  label="Sold Out"
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 1,
                  }}
                />
              )}
              {filteredProducts[0]?.discount && (
                <Chip
                  label={"-" + filteredProducts[0]?.discount + "%"}
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#ff4646",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    zIndex: 1,
                    fontSize: "14px",
                  }}
                />
              )}
              <Box sx={{ padding: "20px", flex: 1 }}>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  fontSize={"36px"}
                  fontWeight={"600"}
                >
                   {selectedCurrency.code === "Rs" 
      ? `${filteredProducts[0]?.currency} ${(filteredProducts[0]?.sales_price * (1 - filteredProducts[0]?.discount / 100)).toFixed(2)}`
      : `${selectedCurrency.code} ${((filteredProducts[0]?.sales_price * (1 - filteredProducts[0]?.discount / 100)) / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "20px",
                    }}
                  >
                    {selectedCurrency.code === "Rs" 
      ? `${filteredProducts[0]?.currency} ${filteredProducts[0]?.sales_price}`
      : `${selectedCurrency.code} ${(filteredProducts[0]?.sales_price / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                  </span>
                </Typography>
                <Typography
                  variant="caption"
                  color="#bebebe"
                  fontWeight={"500"}
                  fontSize={"10px"}
                  letterSpacing={"2px"}
                  sx={{ textTransform: "uppercase" }}
                >
                  {translate(filteredProducts[0]?.category.name)}
                </Typography>

                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  sx={{ marginTop: "auto" }}
                >
                  <Typography
                    variant="body1"
                    fontSize={"16px"}
                    fontWeight={"500"}
                  >
                    {filteredProducts[0]?.name}
                  </Typography>
                  <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              {filteredProducts.slice(1, 4).map((card) => (
                <Grid item xs={12} sm={4} key={card.id}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "20px",
                      // overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onMouseEnter={() => setHoveredProductId(card.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <Link to={`/product/${card.id}`}>
                      {card.discount && (
                        <Chip
                          label={"-" + card.discount + "%"}
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "#ff4646",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            zIndex: 1,
                            fontSize: "14px",
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={card.thumbnailz}
                          alt={card.name}
                          sx={{
                            width: "100%",
                            height: "320px",
                            objectFit: "cover",
                            transition: "opacity 0.5s ease",
                            opacity: hoveredProductId === card.id ? 0 : 1,
                          }}
                        />
                        <Box
                          component="img"
                          src={card.images[0]}
                          alt={card.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "320px",
                            objectFit: "cover",
                            transition: "opacity 0.5s ease",
                            opacity: hoveredProductId === card.id ? 1 : 0,
                          }}
                        />
                      </Box>

                      <Box sx={{ padding: "10px" }}>
                        <Typography
                          variant="caption"
                          fontSize={"12px"}
                          color={"#bebebe"}
                          sx={{ letterSpacing: "1px", marginBottom: "3x" }}
                        >
                          {translate(card.category.name)}
                        </Typography>
                        <Typography
                          variant="body1"
                          // textAlign="center"
                          fontWeight={"500"}
                          sx={{ marginBottom: "8px" }}
                        >
                          {card.name.length > 20
                            ? card.name.slice(0, 20) + "..."
                            : card.name}
                        </Typography>
                        <Box
                          display={"flex"}
                          // alignItems="center"

                          justifyContent="space-between"
                          sx={{ marginTop: "auto" }}
                        >
                          <Typography
                            variant="h6"
                            fontSize={"18px"}
                            fontWeight="600"
                          >
                            {selectedCurrency.code === "Rs" 
      ? `${card.currency} ${(card.sales_price * (1 - card.discount / 100)).toFixed(2)}`
      : `${selectedCurrency.code} ${((card.sales_price * (1 - card.discount / 100)) / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                          </Typography>
                          <Typography
                            variant="h6"
                            fontSize={"12px"}
                            fontWeight="600"
                            color={"#bebebe"}
                            sx={{
                              marginLeft: "8px",
                              textDecoration: "line-through",
                              color: "text.secondary",
                            }}
                          >
                             {selectedCurrency.code === "Rs" 
      ? `${card.currency} ${card.sales_price}`
      : `${selectedCurrency.code} ${(card.sales_price / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                          </Typography>
                          <ChevronRight
                            sx={{ color: "#2189ff", marginLeft: "8px" }}
                          />
                        </Box>
                      </Box>
                    </Link>

                    <IconButton
                      onClick={() => handleAddToCart(card)}
                      sx={{
                        position: "absolute",
                        top: "38%",
                        left: "40%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#2189ff",
                        color: "#fff",
                        borderRadius: "10px",
                        width: "40px",
                        height: "40px",
                        opacity: hoveredProductId === card.id ? 1 : 0,
                        visibility:
                          hoveredProductId === card.id ? "visible" : "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                        zIndex: 2,
                      }}
                    >
                      {addingToCartId === card.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ShoppingCart />
                      )}
                    </IconButton>

                    <IconButton
                      onClick={() => handleAddToWishlist(card)}
                      sx={{
                        position: "absolute",
                        top: "38%",
                        left: "60%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: isInWishlist[card.id]
                          ? "#ff4646"
                          : "#2189ff",
                        color: "#fff",
                        borderRadius: "10px",
                        width: "40px",
                        height: "40px",
                        opacity: hoveredProductId === card.id ? 1 : 0,
                        visibility:
                          hoveredProductId === card.id ? "visible" : "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: isInWishlist[card.id]
                            ? "#ff6b6b"
                            : "#000",
                        },
                        zIndex: 2,
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                </Grid>
              ))}

              {filteredProducts.slice(4, 6).map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
                  <Box
                    onMouseEnter={() => setHoveredProductId(card.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <Link to={`/product/${card.id}`}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          position: "relative",
                          height: "100%",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "20px",
                          overflow: "hidden",
                          backgroundColor: "#fff",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          ":hover": {
                            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        {card.discount && (
                          <Chip
                            label={"-" + card.discount + "%"}
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              backgroundColor: "#ff4646",
                              color: "white",
                              padding: "3px 7px",
                              borderRadius: "3px",
                              fontWeight: "bold",
                              zIndex: 1,
                              fontSize: "14px",
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            position: "relative",
                            width: "50%",
                            borderRadius: "10px",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={card.thumbnailz}
                            alt={card.name}
                            sx={{
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              transition: "opacity 0.5s ease",
                              opacity: hoveredProductId === card.id ? 0 : 1,
                            }}
                          />
                          <Box
                            component="img"
                            src={card.images[0]}
                            alt={card.name}
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              transition: "opacity 0.5s ease",
                              opacity: hoveredProductId === card.id ? 1 : 0,
                            }}
                          />
                        </Box>

                        <Box sx={{ padding: "30px" }}>
                          <Typography
                            variant="caption"
                            fontSize={"12px"}
                            color={"#bebebe"}
                            sx={{ letterSpacing: "1px", marginBottom: "3x" }}
                          >
                            {translate(card.category.name)}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={"500"}
                            sx={{ marginBottom: "8px" }}
                          >
                            {card.name.length > 20
                              ? card.name.slice(0, 20) + "..."
                              : card.name}
                          </Typography>
                          <Box
                            display={"flex"}
                            justifyContent="space-between"
                            sx={{ marginTop: "auto" }}
                          >
                            <Typography
                              variant="h6"
                              fontSize={"13px"}
                              fontWeight="600"
                            >
                               {selectedCurrency.code === "Rs" 
      ? `${card.currency} ${(card.sales_price * (1 - card.discount / 100)).toFixed(2)}`
      : `${selectedCurrency.code} ${((card.sales_price * (1 - card.discount / 100)) / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                            </Typography>
                            <Typography
                              variant="h6"
                              fontSize={"8px"}
                              fontWeight="600"
                              color={"#bebebe"}
                              sx={{
                                marginLeft: "8px",
                                textDecoration: "line-through",
                                color: "text.secondary",
                              }}
                            >
                               {selectedCurrency.code === "Rs" 
      ? `${card.currency} ${card.sales_price}`
      : `${selectedCurrency.code} ${(card.sales_price / parseFloat(selectedCurrency.ratio)).toFixed(2)}`
    }
                            </Typography>
                            <ChevronRight
                              sx={{ color: "#2189ff", marginLeft: "8px" }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                    <IconButton
                      onClick={() => handleAddToCart(card)}
                      sx={{
                        position: "absolute",
                        top: "38%",
                        left: "40%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#2189ff",
                        color: "#fff",
                        borderRadius: "10px",
                        width: "40px",
                        height: "40px",
                        opacity: hoveredProductId === card.id ? 1 : 0,
                        visibility:
                          hoveredProductId === card.id ? "visible" : "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                        zIndex: 2,
                      }}
                    >
                      {addingToCartId === card.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ShoppingCart />
                      )}
                    </IconButton>

                    <IconButton
                      onClick={() => handleAddToWishlist(card)}
                      sx={{
                        position: "absolute",
                        top: "38%",
                        left: "60%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: isInWishlist[card.id]
                          ? "#ff4646"
                          : "#2189ff",
                        color: "#fff",
                        borderRadius: "10px",
                        width: "40px",
                        height: "40px",
                        opacity: hoveredProductId === card.id ? 1 : 0,
                        visibility:
                          hoveredProductId === card.id ? "visible" : "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: isInWishlist[card.id]
                            ? "#ff6b6b"
                            : "#000",
                        },
                        zIndex: 2,
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DealsofMonth;
