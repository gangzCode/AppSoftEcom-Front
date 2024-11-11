import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ProfilePage from "./app/Profile/page";
import SignInSignUpPage from "./app/SignIn/page";

// Define theme
/* const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
}); */

function Layout() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin";

  return (
    <>
      <Box>
        <TopBar />
      </Box>
      <Box paddingX={{ xs: "1em", md: "8em" }}>
        {!isAuthPage && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signin" element={<SignInSignUpPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>

        {!isAuthPage && <Footer />}
      </Box>
      <Copyright />
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;
