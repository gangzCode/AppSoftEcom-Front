import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import {
  Email,
  AccountCircle,
  CalendarToday,
  Phone,
  Person,
} from "@mui/icons-material";

function ProfilePage() {
  return (
    <Container sx={{ marginY: 8 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="textSecondary">
        Home / Account
      </Typography>

      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 2 }}>
        My Account
      </Typography>

      {/* Profile Section */}
      <Grid container alignItems="center" spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm="auto">
          <Avatar
            alt="User Profile"
            src="/path-to-profile-picture.jpg"
            sx={{ width: 100, height: 100, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Brinthan
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Email fontSize="small" sx={{ marginRight: 0.5 }} />{" "}
            brinthsega@gmail.com
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "8px 16px", textTransform: "none" }}
          >
            Sign Out
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ marginRight: 1 }} /> Account Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <AccountCircle sx={{ marginRight: 1 }} /> Address Book
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Phone sx={{ marginRight: 1 }} /> My Orders
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Account Overview
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
          >
            Feel free to edit any of your details so your account is totally up
            to date.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="E-mail Address" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                InputProps={{
                  endAdornment: (
                    <IconButton position="end">
                      <CalendarToday fontSize="small" />
                    </IconButton>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                SelectProps={{ native: true }}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" required />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 2,
                  fontSize: "16px",
                  // "&:hover": { backgroundColor: "#333" },
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
