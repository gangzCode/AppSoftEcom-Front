import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{
        padding: "40px 10em",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Title and Description */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="p"
            fontSize={"12px"}
            color={"#1e1e1e"}
            sx={{
              position: "relative",
              // paddingRight: "20px",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                marginLeft: "1em",
                transform: "translateY(-50%)",
                width: "150px",
                height: "2px",
                backgroundColor: "#2189ff",
              },
            }}
          >
            NEWSLETTER
          </Typography>
          <Typography
            fontWeight={"600"}
            variant="h4"
            component="h1"
            marginBottom={"0"}
            gutterBottom
          >
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
                borderRadius: "30px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "30px",
                padding: "1.1em 3em",
                marginLeft: "-12em",
                boxShadow: "4.243px 4.243px 10px 0px rgba(30, 30, 30, 0.3)",
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
