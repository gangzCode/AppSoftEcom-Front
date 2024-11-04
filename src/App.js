import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./app/cart/CartPage";
import CheckoutPage from "./app/checkout/CheckoutPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./app/page";
import { Grid } from "@mui/material";
import ProductsPage from "./app/products/products";
import ProductDetailsPage from "./app/products/productDetails";
import TopBar from "./components/topBar";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid paddingX={{ xs: "1em", md: "8em" }} paddingTop={"2em"}>
        <TopBar />

        <Navbar />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/productsDetail" element={<ProductDetailsPage />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
