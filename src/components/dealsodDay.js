import {
  ChevronRight,
  Favorite,
  Layers,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography, Chip } from "@mui/material";
import React, { useState,useEffect } from "react";
import { getDealsofDayProducts } from "../services/apiCalls"; 
import { useNavigate } from "react-router-dom";

const DealsofDay = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchGetProducts = async () => {
      try {
        const response = await getDealsofDayProducts();
        setTitle(response?.title );
        setSubTitle(response?.sub_title);
        const filteredProducts = (response?.data || []).filter(
          (product) => product.top_status === 1
        );
        setFilteredProducts(
          filteredProducts
        );
        setProducts(response.data);        
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
        console.error("Error fetching products:", error);
      }
    };

    fetchGetProducts();
  }, []);

  const getCategoryName = (categoryName) => {
    try {
      const parsed = JSON.parse(categoryName);
      return parsed.En || "Unknown Category";
    } catch (error) {
      console.error("Error parsing category name:", error);
      return "Unknown Category";
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const cards = [
    {
      id: 1,
      image: "https://placehold.co/300x400",
      price: "$25999.99",
      description:
        "Acer Frameless 80 cm (32 inch) HD Ready LED Smart Android TV with Google Assistant",
      big: true,
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
    {
      id: 2,
      image: "https://placehold.co/200x300",
      price: "$29.99",
      description: "Right top tall product 1.",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
    {
      id: 3,
      image: "https://placehold.co/200x300",
      price: "$39.99",
      description: "Right top tall product 2.",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
    {
      id: 4,
      image: "https://placehold.co/200x300",
      price: "$49.99",
      description: "Right top tall product 3.",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
    {
      id: 5,
      image: "https://placehold.co/200x200",
      price: "$19.99",
      description: "Right bottom short product 1.",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
    {
      id: 6,
      image: "https://placehold.co/200x200",
      price: "$24.99",
      description: "Right bottom short product 2.",
      hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    },
  ];

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
        {filteredProducts[0]?.currency}{" "}
        {(filteredProducts[0]?.sales_price * (1 - filteredProducts[0]?.discount / 100)).toFixed(2)}

        <span
          style={{
            textDecoration: "line-through",
            marginLeft: "20px",
          }}
        >
          {filteredProducts[0]?.currency} {filteredProducts[0]?.sales_price}
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
        {getCategoryName(filteredProducts[0]?.category.name)}
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
                    onClick={() => handleCardClick(card?.id)}
                    onMouseEnter={() => setHoveredProductId(card.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
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

                    <Box
                      className="hover-icons"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        gap: "8px",
                        opacity: hoveredProductId === card.id ? 1 : 0,
                        visibility:
                          hoveredProductId === card.id ? "visible" : "hidden",
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

                    <Box sx={{ padding: "10px" }}>
                      <Typography
                        variant="caption"
                        fontSize={"12px"}
                        color={"#bebebe"}
                        sx={{ letterSpacing: "1px", marginBottom: "3x" }}
                      >
                        {getCategoryName(card.category.name)}
                      </Typography>
                      <Typography
                        variant="body1"
                        // textAlign="center"
                        fontWeight={"500"}
                        sx={{ marginBottom: "8px" }}
                      >
                        {card.name.length > 20 ? card.name.slice(0, 20) + "..." : card.name}
                      </Typography>
                      <Box
                        display={"flex"}
                        // alignItems="center"

                        justifyContent="space-between"
                        sx={{ marginTop: "auto" }}
                      >
                       <Typography variant="h6" fontSize={"22px"} fontWeight="600">
                            {card.currency}{" "}
                            {(card.sales_price * (1 - card.discount / 100)).toFixed(2)}
                          </Typography>
                         <Typography
                            variant="h6"
                            fontSize={"16px"}
                            fontWeight="600"
                            color={"#bebebe"}
                            sx={{
                              marginLeft: "8px",
                              textDecoration: "line-through",
                              color: "text.secondary",
                            }}
                          >
                            {card.currency} {card.sales_price}
                          </Typography>
                        <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}

              {filteredProducts.slice(4, 6).map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
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
                    onClick={() => handleCardClick(card?.id)}
                    onMouseEnter={() => setHoveredProductId(card.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
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

                      {/* Hover Icons */}
                      <Box
                        className="hover-icons"
                        sx={{
                          position: "absolute", // Positioned absolutely over the image
                          top: "50%", // Vertically center over the image
                          left: "50%", // Horizontally center over the image
                          transform: "translate(-50%, -50%)", // Offset to center the icons
                          display: "flex",
                          gap: "8px",
                          zIndex: 2, // Ensure icons appear above the image
                          opacity: hoveredProductId === card.id ? 1 : 0,
                          visibility:
                            hoveredProductId === card.id ? "visible" : "hidden",
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
                    </Box>

                    <Box sx={{ padding: "30px" }}>
                      <Typography
                        variant="caption"
                        fontSize={"12px"}
                        color={"#bebebe"}
                        sx={{ letterSpacing: "1px", marginBottom: "3x" }}
                      >
                        {getCategoryName(card.category.name)}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={"500"}
                        sx={{ marginBottom: "8px" }}
                      >
                        {card.name.length > 20 ? card.name.slice(0, 20) + "..." : card.name}
                      </Typography>
                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        sx={{ marginTop: "auto" }}
                      >
                        <Typography variant="h6" fontSize={"22px"} fontWeight="600">
                            {card.currency}{" "}
                            {(card.sales_price * (1 - card.discount / 100)).toFixed(2)}
                          </Typography>
                         <Typography
                            variant="h6"
                            fontSize={"16px"}
                            fontWeight="600"
                            color={"#bebebe"}
                            sx={{
                              marginLeft: "8px",
                              textDecoration: "line-through",
                              color: "text.secondary",
                            }}
                          >
                            {card.currency} {card.sales_price}
                          </Typography>
                        <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                      </Box>
                    </Box>
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

export default DealsofDay;