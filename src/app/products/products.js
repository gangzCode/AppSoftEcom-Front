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
} from "@mui/material";

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
  {
    id: 3,
    title: "Product 3",
    price: 19.99,
    image: "https://placehold.co/150",
    available: true,
    category: "Category A",
  },
  {
    id: 3,
    title: "Product 3",
    price: 19.99,
    image: "https://placehold.co/150",
    available: true,
    category: "Category A",
  },
  {
    id: 3,
    title: "Product 3",
    price: 19.99,
    image: "https://placehold.co/150",
    available: true,
    category: "Category A",
  },
];

const ProductsPage = () => {
  const [sort, setSort] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availability, setAvailability] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

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

  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      <Box sx={{ width: "25%", paddingRight: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <FormControlLabel
          control={
            <Checkbox
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
          }
          label="Available Only"
          sx={{ mb: 2 }}
        />

        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ width: "75%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
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

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sort By">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.slice(0, productsPerPage).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
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
  );
};

export default ProductsPage;
