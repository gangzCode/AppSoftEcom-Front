import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessages(["All fields are required."]);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessages(["Passwords do not match."]);
      return;
    }

    try {
      const response = await registerUser(
        firstName,
        lastName,
        email,
        phone,
        password
      );
      console.log("Registration successful:", response);

      navigate("/otp", { state: { email } });
    } catch (err) {
      if (err.errors) {
        const messages = Object.values(err.errors).flat();
        setErrorMessages(messages);
      } else {
        setErrorMessages([
          err.message || "Registration failed. Please try again.",
        ]);
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "30vh",
        mt: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        {errorMessages.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {errorMessages.map((error, index) => (
              <Typography
                key={index}
                variant="body2"
                color="error"
                align="center"
              >
                {error}
              </Typography>
            ))}
          </Box>
        )}

        <Box component="form" onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            margin="normal"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/signin" color="primary">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;