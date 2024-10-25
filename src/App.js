import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./app/page";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid paddingX={"8em"} paddingTop={"4em"}>
      <Navbar />

      <HomePage />

      <Footer />
    </Grid>
  );
}

export default App;
