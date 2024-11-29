import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { updatePassword } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await updatePassword(code, email, newPassword);
      if (response.http_status === 200) {
        setSuccess(
          response.message || "Reset link sent! Please check your email."
        );
        navigate("/signin");
      } else {
        setError(
          response.message || "Failed to update password. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
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
          Reset Password
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
        <Box component="form" onSubmit={handleUpdatePassword}>
          <TextField
            fullWidth
            label="OTP"
            variant="outlined"
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
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
            label="New Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            Update Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
