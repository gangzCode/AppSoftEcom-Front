import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./app/page";
import { Grid } from "@mui/material";
import ProductsPage from "./app/products/products";
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./app/cart/CartPage";
import CheckoutPage from "./app/checkout/CheckoutPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid paddingX={{ xs: "1em", md: "8em" }} paddingTop={"4em"}>
        <Navbar />

        {/* <HomePage /> */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={HomePage} />
            <Route path="/cart" Component={CartPage} />
            <Route path="/checkout" Component={CheckoutPage} />
          </Routes>
        </BrowserRouter>
        {/* <ProductsPage /> */}
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
