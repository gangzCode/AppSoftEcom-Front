import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { sendResetLink } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await sendResetLink(email);
      if (response.http_status === 200) {
        setMessage(
          response.message || "Reset link sent! Please check your email."
        );
        navigate("/reset-password");
      } else {
        setError(
          response.message || "Failed to send reset link. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
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
          Forgot Password
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        {message && (
          <Typography variant="body2" color="success" align="center">
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSendResetLink}>
          <TextField
            fullWidth
            label="Enter your email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Send Reset Link
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
