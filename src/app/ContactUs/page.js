import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API integration here
    setSnackbar({
      open: true,
      message: "Message sent successfully!",
      severity: "success",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 6 }, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#1e1e1e",
            mb: 4,
            textAlign: { xs: "left", md: "center" }
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Info Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-5px)" }
            }}>
              <Email sx={{ fontSize: 40, color: "#2189ff", mb: 2 }} />
              <Typography variant="h6" gutterBottom>Email</Typography>
              <Typography color="text.secondary">support@example.com</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-5px)" }
            }}>
              <Phone sx={{ fontSize: 40, color: "#2189ff", mb: 2 }} />
              <Typography variant="h6" gutterBottom>Phone</Typography>
              <Typography color="text.secondary">+1 234 567 8900</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-5px)" }
            }}>
              <LocationOn sx={{ fontSize: 40, color: "#2189ff", mb: 2 }} />
              <Typography variant="h6" gutterBottom>Address</Typography>
              <Typography color="text.secondary" textAlign="center">
                123 Business Street
                <br />City, State 12345
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2189ff" },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2189ff" },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2189ff" },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2189ff" },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#2189ff",
                      "&:hover": { bgcolor: "#1c7ae0" },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUsPage;
