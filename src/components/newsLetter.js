import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { subscribeToNewsApi } from "../services/apiCalls"; // Assuming your API function is in services/apiCalls
import { Container } from "../common/Spacing";

const Newsletter = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for snackbar type

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  const handleSubscribe = async () => {
    if (!email) {
      setSnackbarMessage("Please enter a valid email address!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      await subscribeToNewsApi(email);
      setSnackbarMessage("You have successfully subscribed to our newsletter.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setEmail("");
    } catch (error) {
      setSnackbarMessage("Subscription failed! Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      sx={{
        padding: {
          xs: "1.5em",
          sm: "2em 3em",
          md: "2em 9em",
        },
        backgroundColor: "#f5f5f5",
        borderRadius: { xs: "15px", sm: "20px" },
        margin: { xs: "1em", sm: "2em" },
      }}
    >
      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
        {/* Left Side: Title and Description */}
        <Grid item xs={12} md={6}>
          <Typography
            fontSize={{ xs: "8px", sm: "10px" }}
            fontWeight="500"
            letterSpacing="2px"
            color="#1e1e1e"
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                marginLeft: "1em",
                transform: "translateY(-50%)",
                width: { xs: "80px", sm: "120px", md: "150px" },
                height: "2px",
                backgroundColor: "#2189ff",
              },
            }}
          >
            NEWSLETTER
          </Typography>
          <Typography
            fontWeight="700"
            variant="h4"
            component="h1"
            fontSize={{ xs: "24px", sm: "30px", md: "36px" }}
            marginBottom="0"
            gutterBottom
          >
            Subscribe to our newsletter
          </Typography>
          <Typography variant="body1">
            Join our mailing list and get 25% off on your next purchase!
          </Typography>
        </Grid>

        {/* Right Side: Email Input and Subscribe Button */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Your Email here"
              fullWidth
              value={email} // Bind email state to the input field
              onChange={handleEmailChange} // Update email on input change
              sx={{
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
              onClick={handleSubscribe} // Call handleSubscribe on button click
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Newsletter;
