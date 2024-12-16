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
import ScrollToTopButton from "./components/ScrollToTop";
import FAQPage from "./app/Faq/page";
import NotFoundPage from "./components/404";
import { Provider } from "react-redux";
import store from "./store";
import SignInPage from "./app/auth/SignInpage";
import SignUpPage from "./app/auth/SignUpPage";
import OTPPage from "./app/auth/OTPPage";
import ForgotPasswordPage from "./app/auth/ForgotPasswordPage";
import ResetPasswordPage from "./app/auth/ResetPasswordPage";
import DynamicFavicon from "./components/dynamicFavicon";
import PrivateRoute from "./components/privateRoute";
import { AuthProvider } from "./context/AuthContext";
import CustomProducts from "./components/CustomProducts";
import Snow from "./components/Snow";
import ContactUsPage from "./app/ContactUs/page";
import TermsPage from "./app/Terms/page";

// Define theme
/* const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
}); */

function Layout() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signup";

  return (
    <>
      <Box sx={{ minHeight: "100vh", position: "relative" }}>
        <Snow />
        <DynamicFavicon />
        {/* <Box>
          <TopBar />
        </Box> */}
        {<Navbar />}
        <Box paddingX={{ xs: "1em", md: "8em" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* <Route path="/forgotpassword" element={< />} /> */}
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/custom-products" element={<CustomProducts />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>

          {<Footer />}
        </Box>
        <Copyright />
        <ScrollToTopButton />
      </Box>
    </>
  );
}

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
