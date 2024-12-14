import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/apiCalls";

const OTPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [activationCode, setActivationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await verifyOtp(email, activationCode);

      if (response.http_status === 200) {
        setSuccess("OTP verified successfully!");
        navigate("/");
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "OTP verification failed. Please try again.");
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
          OTP Verification
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
        <Box component="form" onSubmit={handleVerifyOtp}>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            margin="normal"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Verify OTP
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OTPPage;
