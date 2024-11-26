import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Slider,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Add,
  ChevronRight,
  Favorite,
  HdrPlus,
  Layers,
  PlusOne,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import CarouselSection from "../../components/carousel";
import BestsellerSlider from "../../components/bestsellerSlider";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchProducts, getTopSellingProducts } from "../../services/apiCalls";

const ProductsPage = () => {
  const [sort, setSort] = useState("Sort By");
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availability, setAvailability] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [products, setproducts] = useState([]);
  const [displayMode, setDisplayMode] = useState("grid");
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const { categoryId } = useParams();

  useEffect(() => {
    console.log("CategoryId from Params:", categoryId);
    const fetchGetProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(categoryId);
        setproducts(response.data);
        console.log("Products by Category", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetProducts();
  }, [categoryId]);

  useEffect(() => {
    if (products.length > 0) {
      const allPrices = products.flatMap((product) => {
        const basePrice = product.price || 0;
        const variationPrices =
          product.product_variations?.map((v) =>
            parseFloat(v.variation_decimal)
          ) || [];
        return [basePrice, ...variationPrices];
      });

      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceInputChange = (type) => (event) => {
    const value = Number(event.target.value);
    if (type === "min") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const getSortedProducts = (products, sortType) => {
    const sortedProducts = [...products];
    switch (sortType) {
      case "priceAsc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  };

  const getCategoriesAndSubcategories = () => {
    const categoriesMap = new Map();

    products.forEach((product) => {
      try {
        const categoryName = JSON.parse(product.category?.name)?.En;
        const subCategoryName = product.sub_category
          ? JSON.parse(product.sub_category?.name)?.En
          : null;

        if (!categoriesMap.has(categoryName)) {
          categoriesMap.set(categoryName, new Set());
        }

        if (subCategoryName) {
          categoriesMap.get(categoryName).add(subCategoryName);
        }
      } catch (e) {
        console.error("Error parsing category/subcategory:", e);
      }
    });

    return Object.fromEntries(
      Array.from(categoriesMap.entries()).map(([category, subcategories]) => [
        category,
        Array.from(subcategories),
      ])
    );
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => {
        try {
          const categoryName = JSON.parse(product.category?.name)?.En;
          if (categoryName !== selectedCategory) return false;

          if (selectedSubCategory) {
            const subCategoryName = product.sub_category
              ? JSON.parse(product.sub_category?.name)?.En
              : null;
            return subCategoryName === selectedSubCategory;
          }
          return true;
        } catch (e) {
          return false;
        }
      });
    }

    if (availability) {
      filtered = filtered.filter((product) => product.available_stock > 0);
    }

    filtered = filtered.filter((product) => {
      const basePrice = product.price || 0;
      const variationPrices =
        product.product_variations?.map((v) =>
          parseFloat(v.variation_decimal)
        ) || [];
      const allPrices = [basePrice, ...variationPrices];
      const lowestPrice = Math.min(...allPrices);

      return lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];
    });

    return getSortedProducts(filtered, sort);
  };

  const handleDisplayModeChange = (event, newDisplayMode) => {
    if (newDisplayMode) setDisplayMode(newDisplayMode);
  };

  const getPriceRange = (products) => {
    if (products.length === 0) return { lowest: null, highest: null };

    let lowest = products[0].price;
    let highest = products[0].price;

    products.forEach((product) => {
      if (product.price < lowest) lowest = product.price;
      if (product.price > highest) highest = product.price;
    });

    return { lowest, highest };
  };

  const realPriceRange = getPriceRange(products);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Products...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ display: "inline-flex", opacity: 0.8 }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/products">
            Products
          </Link>
        </Breadcrumbs>
      </Box>
      <Box sx={{ display: "flex", padding: "20px 0" }}>
        <Box sx={{ width: "20%", paddingRight: "2.5em" }}>
          <Box>
            <TextField
              label="Search for Product"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
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

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<Add />}>
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubCategory("");
                      }}
                      label="Category"
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {Object.keys(getCategoriesAndSubcategories()).map(
                        (category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl> */}

                  {selectedCategory &&
                    getCategoriesAndSubcategories()[selectedCategory]?.length >
                      0 && (
                      <FormControl fullWidth>
                        <InputLabel>Subcategory</InputLabel>
                        <Select
                          value={selectedSubCategory}
                          onChange={(e) =>
                            setSelectedSubCategory(e.target.value)
                          }
                          label="Subcategory"
                        >
                          <MenuItem value="">All Subcategories</MenuItem>
                          {getCategoriesAndSubcategories()[
                            selectedCategory
                          ].map((subCategory) => (
                            <MenuItem key={subCategory} value={subCategory}>
                              {subCategory}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<Add />}>
                <Typography>Availability</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={availability}
                      onChange={(e) => setAvailability(e.target.checked)}
                    />
                  }
                  label="In Stock"
                />
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<Add />}>
                <Typography>Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  fontSize={"16px"}
                  fontWeight={"400"}
                  color={"#1e1e1e"}
                  textAlign="left"
                  sx={{ marginBottom: "4px" }}
                >
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={Math.min(...products.map((p) => p.price || 0))}
                  max={Math.max(...products.map((p) => p.price || 0))}
                />
                <Box display={"flex"} gap={3} flexDirection={"row"}>
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"400"}
                      color={"#1e1e1e"}
                      textAlign="left"
                      sx={{ marginBottom: "4px" }}
                    >
                      From $
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="number"
                      value={priceRange[0]}
                      onChange={handlePriceInputChange("min")}
                      fullWidth
                      sx={{
                        border: "none",
                        input: {
                          padding: "13px 20px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          backgroundColor: "#f3f3f3",
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"400"}
                      color={"#1e1e1e"}
                      textAlign="left"
                      sx={{ marginBottom: "4px" }}
                    >
                      To $
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="number"
                      value={priceRange[1]}
                      onChange={handlePriceInputChange("max")}
                      fullWidth
                      sx={{
                        border: "none",
                        input: {
                          padding: "13px 20px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          backgroundColor: "#f3f3f3",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box padding={"2em 0 0"}>
            <BestsellerSlider />
          </Box>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "2em 1em",
              borderRadius: "16px",
            }}
          >
            <Typography
              fontSize={"20px"}
              fontWeight={"600"}
              color={"#1e1e1e"}
              textAlign="left"
              sx={{ marginBottom: "8px", padding: "0 1em 1.5em" }}
            >
              Today's Trends
            </Typography>

            <Box
              component="img"
              src={"https://placehold.co/380x360"}
              sx={{
                width: { xs: "100%", md: "300px" },
                height: "auto",
                margin: "2em 0",
              }}
            />

            <Button
              sx={{
                backgroundColor: "#2189ff",
                padding: ".4em 1.8em",
                borderRadius: "8px",
                textTransform: "unset",
                fontSize: "16px",
                fontWeight: "500",
              }}
              variant="contained"
            >
              Shop Now
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "80%" }}>
          <Box
            sx={{
              marginBottom: "30px",
              padding: "30px",
              border: "1px solid #e9e9e9",
            }}
          >
            <Typography variant="h3" fontWeight="500" sx={{}}>
              Computer Peripherals
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <ToggleButtonGroup
              value={displayMode}
              exclusive
              onChange={handleDisplayModeChange}
              aria-label="Display Mode"
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                // fontWeight="500"
                textAlign="left"
                sx={{ marginRight: "8px" }}
              >
                Displayed As
              </Typography>
              <ToggleButton
                sx={{
                  "&.Mui-selected": {
                    color: "#ffffff",
                    backgroundColor: "#2189ff",
                    "&:hover": {
                      backgroundColor: "#0066cc",
                    },
                  },
                }}
                value="grid"
                aria-label="Grid View"
              >
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton
                sx={{
                  "&.Mui-selected": {
                    color: "#ffffff",
                    backgroundColor: "#2189ff",
                    "&:hover": {
                      backgroundColor: "#0066cc",
                    },
                  },
                }}
                value="list"
                aria-label="List View"
              >
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl
              sx={{ minWidth: 120, flexDirection: "row", alignItems: "center" }}
            >
              <Typography
                variant="body1"
                // fontWeight="500"
                textAlign="left"
                sx={{ marginRight: "8px" }}
              >
                Products Per Page
              </Typography>
              <Select
                value={productsPerPage}
                variant="filled"
                onChange={handleProductsPerPageChange}
                sx={{
                  "&.MuiFilledInput-root": {
                    ".MuiSelect-select": {
                      padding: "10px 30px 10px 20px",
                      color: "#fff",
                    },
                    ".MuiSvgIcon-root": {
                      color: "#fff",
                    },
                    backgroundColor: "#2189ff",
                    "&:hover": {
                      backgroundColor: "#0066cc",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#0066cc",
                    },
                  },
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ minWidth: 120, flexDirection: "row", alignItems: "center" }}
            >
              <Typography
                variant="body1"
                // fontWeight="500"
                textAlign="left"
                sx={{ marginRight: "8px" }}
              >
                Sort by
              </Typography>
              <Select
                variant="filled"
                sx={{
                  "&.MuiFilledInput-root": {
                    ".MuiSelect-select": {
                      padding: "10px 30px 10px 20px",
                      color: "#fff",
                    },
                    ".MuiSvgIcon-root": {
                      color: "#fff",
                    },
                    backgroundColor: "#2189ff",
                    "&:hover": {
                      backgroundColor: "#0066cc",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#0066cc",
                    },
                  },
                }}
                value={sort}
                onChange={handleSortChange}
              >
                <MenuItem value="Sort By">None</MenuItem>
                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid
            container
            gap={"34px"}
            direction={displayMode === "grid" ? "row" : "column"}
          >
            {getFilteredProducts()
              .slice(0, productsPerPage)
              .map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "280px",
                    width: "31%",
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
                  <RouterLink to={`/product/${product.id}`}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "360px",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={
                          product.image ||
                          "https://placehold.co/360x340?text=Image+Not+Found"
                        }
                        alt={product.description}
                        sx={{
                          width: "100%",
                          height: "auto",
                          transition: "opacity 0.5s ease",
                          opacity: hoveredProductId === product.id ? 0 : 1,
                        }}
                      />
                      <Box
                        component="img"
                        src={
                          product.image ||
                          "https://placehold.co/360x340?text=Image+Not+Found"
                        }
                        alt={product.description}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "auto",
                          transition: "opacity 0.5s ease",
                          opacity: hoveredProductId === product.id ? 1 : 0,
                        }}
                      />
                    </Box>

                    <Box
                      className="hover-icons"
                      sx={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        gap: "8px",
                        opacity: hoveredProductId === product.id ? 1 : 0,
                        visibility:
                          hoveredProductId === product.id
                            ? "visible"
                            : "hidden",
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
                      textAlign="left"
                      sx={{ letterSpacing: "1px", marginBottom: "4px" }}
                    >
                      {(() => {
                        try {
                          const category = JSON.parse(
                            product.category?.name
                          )?.En;
                          const subCategory = product.sub_category
                            ? JSON.parse(product.sub_category?.name)?.En
                            : null;
                          return subCategory
                            ? `${category} > ${subCategory}`
                            : category;
                        } catch (e) {
                          return "";
                        }
                      })()}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="500"
                      textAlign="left"
                      sx={{ marginBottom: "8px" }}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      justifyContent="space-between"
                      textAlign="left"
                      sx={{ marginTop: "auto" }}
                    >
                      <Typography variant="h6" fontWeight="600">
                        ${product.price ? product.price : 0}
                      </Typography>
                      <ChevronRight
                        sx={{ color: "#2189ff", marginLeft: "8px" }}
                      />
                    </Box>
                  </RouterLink>
                </Box>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;
