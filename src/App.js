import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./app/cart/CartPage";
import CheckoutPage from "./app/checkout/CheckoutPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./app/page";
import { Box, Grid } from "@mui/material";
import ProductsPage from "./app/products/products";
import ProductDetailsPage from "./app/products/productDetails";
import TopBar from "./components/topBar";
import Copyright from "./components/copyright";

// Define theme
/* const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
}); */

function App() {
  return (
    <>
      <Box>
        <TopBar />
      </Box>
      <Box paddingX={{ xs: "1em", md: "8em" }}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
          </Routes>
        </BrowserRouter>

        <Footer />
      </Box>
      <Copyright />
    </>
  );
}

export default App;
