import React, { useState } from "react";
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

const products = [
  {
    id: 1,
    title: "Product 1",
    price: 29.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
    hoverImage: "https://placehold.co/360x340?text=Hover+Image+1",
    description: "Product 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 59.99,
    image: "https://placehold.co/380x360",
    available: false,
    category: "Category B",
    hoverImage: "https://placehold.co/360x340?text=Hover+Image+2",
    description: "Product 2",
  },
  {
    id: 3,
    title: "Product 3",
    price: 19.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
  },
  {
    id: 4,
    title: "Product 4",
    price: 29.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
  },
  {
    id: 5,
    title: "Product 5",
    price: 59.99,
    image: "https://placehold.co/380x360",
    available: false,
    category: "Category B",
  },
  {
    id: 6,
    title: "Product 6",
    price: 19.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
  },
  {
    id: 7,
    title: "Product 7",
    price: 29.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
  },
  {
    id: 8,
    title: "Product 8",
    price: 59.99,
    image: "https://placehold.co/380x360",
    available: false,
    category: "Category B",
  },
  {
    id: 9,
    title: "Product 9",
    price: 19.99,
    image: "https://placehold.co/380x360",
    available: true,
    category: "Category A",
  },
];

const ProductsPage = () => {
  const [sort, setSort] = useState("Sort By");
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availability, setAvailability] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [displayMode, setDisplayMode] = useState("grid");
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) => (availability ? product.available : true))
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const handleDisplayModeChange = (event, newDisplayMode) => {
    if (newDisplayMode) setDisplayMode(newDisplayMode);
  };

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
      <Box sx={{ display: "flex", padding: "20px" }}>
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

            <Accordion>
              <AccordionSummary expandIcon={<Add />}>
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Category A">Category A</MenuItem>
                    <MenuItem value="Category B">Category B</MenuItem>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>

            <Accordion>
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

            <Accordion>
              <AccordionSummary expandIcon={<Add />}>
                <Typography>Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box padding={"2em 0"}>
            <BestsellerSlider />
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
            // spacing={3}
            gap={"34px"}
            direction={displayMode === "grid" ? "row" : "column"}
          >
            {filteredProducts.slice(0, productsPerPage).map((product) => (
              <Box
                key={product.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
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
                    src={product.image}
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
                    src={product.hoverImage}
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
                    { icon: <Layers />, id: "layers" },
                    { icon: <Favorite />, id: "favorite" },
                    { icon: <Search />, id: "search" },
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
                  sx={{ letterSpacing: "1px", marginBottom: "8px" }}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  textAlign="left"
                  sx={{ marginBottom: "8px" }}
                >
                  {product.description}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="left"
                  sx={{ marginTop: "auto" }}
                >
                  <Typography variant="h6" fontWeight="600">
                    ${product.price}
                  </Typography>
                  <ChevronRight sx={{ color: "#2189ff", marginLeft: "8px" }} />
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;