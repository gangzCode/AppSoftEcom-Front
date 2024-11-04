import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{
        margin: "2em 0 4em",
        padding: "2em 9em",
        backgroundColor: "#f5f5f5",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Title and Description */}
        <Grid item xs={12} md={6}>
          <Typography
            fontSize={"10px"}
            fontWeight={"500"}
            letterSpacing={"2px"}
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
            fontWeight={"700"}
            variant="h4"
            component="h1"
            fontSize={"36px"}
            marginBottom={"0"}
            gutterBottom
          >
            Sign Up Our News Letter
          </Typography>
          <Typography variant="body1">
            join our mail list and get 25% offers
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Your Email here"
              fullWidth
              sx={{
                // height: "1em",
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "30px",
                input: {
                  padding: "13px 20px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#2189ff",
                textTransform: "unset",
                fontWeight: "600",
                fontSize: "16px",
                borderRadius: "30px",
                padding: ".7em 2em",
                marginLeft: "-9em",
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
