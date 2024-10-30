import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baselightTheme } from "./themes/DefaultColors";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
