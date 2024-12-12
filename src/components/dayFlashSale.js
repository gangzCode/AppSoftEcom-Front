import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton,Chip } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, ShoppingCart, Favorite } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getDayFlashSaleProducts } from "../services/apiCalls";
import { Container } from "../common/Spacing";

const DayFlashSale = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]); // Ensure products is an array
  const [title, setTitle] = useState("Default Title"); // Initialize with default
  const [subTitle, setSubTitle] = useState("Default Subtitle");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getDayFlashSaleProducts();
        setTitle(response?.title || "Default Title");
        setSubTitle(response?.sub_title || "Default Subtitle");
        setProducts(response?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    },
    onSwipedRight: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Typography
        variant="p"
        fontSize={{ xs: "10px", sm: "12px" }}
        color={"#1e1e1e"}
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            marginLeft: "1em",
            transform: "translateY(-50%)",
            width: { xs: "80px", sm: "120px", md: "150px" },
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
      <Box
        {...handlers}
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: { xs: 2, sm: 3 },
          padding: { xs: 1, sm: 2 },
          scrollBehavior: "smooth",
          paddingBottom: { xs: "30px", sm: "50px" },
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": {
            height: { xs: "6px", sm: "8px" },
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2189ff",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ccc",
          },
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "280px",
                  padding: "20px",
                  borderRadius: "20px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                {/* Sold Out Chip */}
                {product?.soldOut && (
                        <Chip
                          label="Sold Out"
                          color="error"
                          sx={{ position: "absolute", top: 16, left: 16 }}
                        />
                      )}
                {/* Discount Chip */}
                {product.discount && (
                  <Chip
                    label={'-'+product.discount+'%'}
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
                    maxWidth: "240px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={product.thumbnailz}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      transition: "opacity 0.5s ease",
                      opacity: hoveredProductId === product.id ? 0 : 1,
                    }}
                  />
                  <Box
                    component="img"
                    src={product.images[0]}
                    alt={product.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      transition: "opacity 0.5s ease",
                      opacity: hoveredProductId === product.id ? 1 : 0,
                    }}
                  />
                </Box>

                <Box
                  className="hover-icons"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    gap: "8px",
                    opacity: hoveredProductId === product.id ? 1 : 0,
                    visibility:
                      hoveredProductId === product.id ? "visible" : "hidden",
                    transition: "opacity 0.3s ease, visibility 0.3s ease",
                  }}
                >
                  {[
                    { icon: <ShoppingCart />, id: "cart" },
                    { icon: <Favorite />, id: "favorite" },
                  ].map((item) => (
                    <IconButton
                      key={item.id}
                      sx={{
                        backgroundColor: "#2189ff",
                        color: "#fff",
                        borderRadius: "10px",
                        width: "40px",
                        height: "40px",
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  fontSize={"12px"}
                  color={"#bebebe"}
                  sx={{ letterSpacing: "1px", marginBottom: "3px" }}
                >
                  {product.category_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="400"
                  sx={{ marginBottom: "8px" }}
                >
                  {product.name.substr(0, 20)}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  sx={{ marginTop: "auto" }}
                >
                  <Typography variant="h6" fontSize={"22px"} fontWeight="600">
                    {product.currency}
                    {product.sales_price}
                  </Typography>
                  <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                </Box>
              </Box>
            </Link>
          ))
        ) : (
          <Typography variant="body1">No products available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default DayFlashSale;
