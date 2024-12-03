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
  Tabs,
  Tab,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Email,
  AccountCircle,
  CalendarToday,
  Phone,
  Person,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/apiCalls";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const handleOpenDialog = (address = null) => {
    if (address) {
      setFormData(address);
      setSelectedAddress(address);
    } else {
      setFormData({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault: false,
      });
      setSelectedAddress(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAddress(null);
  };

  const handleSaveAddress = () => {
    if (selectedAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === selectedAddress.id ? formData : addr
        )
      );
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  return (
    <Box>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Add New Address
      </Button>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} md={6} key={address.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="body1">{address.street}</Typography>
                    <Typography variant="body2">
                      {`${address.city}, ${address.state} ${address.zipCode}`}
                    </Typography>
                    <Typography variant="body2">{address.country}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpenDialog(address)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteAddress(address.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }} component="form">
            <TextField
              fullWidth
              label="Street Address"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Zip Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              margin="dense"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveAddress} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const OrdersHistory = () => {
  const mockOrders = [
    {
      id: "ORD001",
      date: "2024-03-15",
      status: "Delivered",
      total: 299.99,
      items: [
        { name: "Blue T-Shirt", quantity: 2, price: 49.99 },
        { name: "Black Jeans", quantity: 1, price: 199.99 },
      ],
    },
    {
      id: "ORD002",
      date: "2024-03-10",
      status: "Processing",
      total: 159.99,
      items: [{ name: "Running Shoes", quantity: 1, price: 159.99 }],
    },
    {
      id: "ORD003",
      date: "2024-03-05",
      status: "Shipped",
      total: 89.97,
      items: [{ name: "Baseball Cap", quantity: 3, price: 29.99 }],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Processing":
        return "warning";
      case "Shipped":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>
      <Grid container spacing={2}>
        {mockOrders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order #{order.id}
                  </Typography>
                  <Alert severity={getStatusColor(order.status)} sx={{ py: 0 }}>
                    {order.status}
                  </Alert>
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  Ordered on: {new Date(order.date).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {order.items.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography>
                      {item.quantity}x {item.name}
                    </Typography>
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
    console.log("ddsds", user);
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

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            icon={<Person />}
            iconPosition="start"
            label="Account Overview"
          />
          <Tab
            icon={<AccountCircle />}
            iconPosition="start"
            label="Address Book"
          />
          <Tab icon={<Phone />} iconPosition="start" label="My Orders" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

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
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <AddressBook />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <OrdersHistory />
        </TabPanel>
      </Box>

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
