import React from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfilePage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, my: 3 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            alt="User Name"
            src="/profile-picture.jpg"
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box flexGrow={1}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="textSecondary">
              johndoe@example.com
            </Typography>
          </Box>
          <IconButton color="primary" aria-label="edit-profile">
            <EditIcon />
          </IconButton>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Profile Information
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="johndoe@example.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary="123 Main Street, City, Country"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payment & Orders
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payment History" secondary="$189" />
            <Button variant="outlined" color="primary" size="small">
              Manage
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Order History" secondary="View all orders" />
            <Button variant="outlined" color="primary" size="small">
              View
            </Button>
          </ListItem>
        </List>
      </Paper>

      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
