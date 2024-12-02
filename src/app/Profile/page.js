import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email,
  AccountCircle,
  CalendarToday,
  Phone,
  Person,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/apiCalls";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [dob, setDob] = useState(user?.dob || "");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhone(user.phone || "");
      setGender(user.gender || "");
      setDob(user.dob || "");
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleSaveChanges = async () => {
    console.log('ddsds',user);
    const savedData = localStorage.getItem("user");
    const { token } = JSON.parse(savedData);
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      phone,
      gender,
      dob,
    };

    try {
      const response = await updateUserProfile(updatedData, token);
      console.log("Profile updated successfully", response);
      setSnackbarMessage("Profile updated successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating profile", error);
      setSnackbarMessage("Failed to update profile. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

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
            src={user?.profile_image || "/path-to-profile-picture.jpg"}
            sx={{ width: 100, height: 100, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Email fontSize="small" sx={{ marginRight: 0.5 }} />{" "}
            {user?.email || "No email provided"}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "8px 16px", textTransform: "none" }}
            onClick={handleSignOut}
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
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            {/* Email Address (Read-only) */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-mail Address"
                required
                value={user?.email || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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

            {/* Gender and Phone Number on the same row */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 2,
                  fontSize: "16px",
                }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Snackbar for success or error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProfilePage;