// Import necessary libraries and components
import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SignInSignUpPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 400 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box textAlign="center" sx={{ my: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<Google />}>
            Sign in with Google
          </Button>
        </Box>

        <Box textAlign="center" sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            OR
          </Typography>
        </Box>

        <Box component="form">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
          />
          {tabIndex === 1 && (
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
            />
          )}
          <Link to={"/profile"}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {tabIndex === 0 ? "Sign In" : "Sign Up"}
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInSignUpPage;
