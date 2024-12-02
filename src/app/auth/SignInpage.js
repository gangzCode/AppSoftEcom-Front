import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { loginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);
      if (response.http_status === 200) {
        const { token, info } = response.data;
        login(token, info); // Pass both token and user info to login
        setSuccess("Login successful!");
        navigate("/profile");
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
          Sign In
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success" align="center">
            {success}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Sign In
          </Button>
        </Box>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <Link href="/forgot-password" color="primary">
              Forgot your password?
            </Link>
          </Typography>
        </Box>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" color="primary">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;
