import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{ padding: "40px", backgroundColor: "#f5f5f5", borderRadius: "10px" }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Title and Description */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1">
            Stay updated with the latest news and special offers. Join our
            community today!
          </Typography>
        </Grid>

        {/* Right Side: Email Input and Subscribe Button */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              sx={{
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                marginLeft: "10px",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;
