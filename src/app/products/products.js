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
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
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

const products = [
  {
    id: 1,
    title: "Product 1",
    price: 29.99,
    image: "https://placehold.co/150",
    available: true,
    category: "Category A",
  },
  {
    id: 2,
    title: "Product 2",
    price: 59.99,
    image: "https://placehold.co/150",
    available: false,
    category: "Category B",
  },
  {
    id: 3,
    title: "Product 3",
    price: 19.99,
    image: "https://placehold.co/150",
    available: true,
    category: "Category A",
  },
  // Add more products as needed
];

const ProductsPage = () => {
  const [sort, setSort] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availability, setAvailability] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [displayMode, setDisplayMode] = useState("grid");

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
      <Box
        sx={{
          backgroundImage: "url(https://placehold.co/1200x300)", // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="500" sx={{ mt: 2 }}>
          Collection
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ display: "inline-flex", color: "white", opacity: 0.8 }}
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
        <Box sx={{ width: "25%", paddingRight: "20px" }}>
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

          {/* Category Filter - Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Availability Filter - Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

          {/* Price Filter - Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

        <Box sx={{ width: "75%" }}>
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
            >
              <ToggleButton value="grid" aria-label="Grid View">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="List View">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Products per page</InputLabel>
              <Select
                value={productsPerPage}
                onChange={handleProductsPerPageChange}
                label="Products per page"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {/* Sort By */}
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort By">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product Grid/List */}
          <Grid
            container
            spacing={3}
            direction={displayMode === "grid" ? "row" : "column"}
          >
            {filteredProducts.slice(0, productsPerPage).map((product) => (
              <Grid
                item
                xs={12}
                sm={displayMode === "grid" ? 6 : 12}
                md={displayMode === "grid" ? 4 : 12}
                key={product.id}
              >
                <Card
                  sx={{ display: displayMode === "list" ? "flex" : "block" }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;
