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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
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
import {
  updateUserProfile,
  createUserAddress,
  getUserAddress,
  deleteUserAddress,
  updateUserAddress,
  getCountries,
  getCities,
  getUserOrders,
} from "../../services/apiCalls";
import { Chip } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postal_code: "",
    country: "",
    is_default: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountryId) {
        try {
          const response = await getCities(selectedCountryId);
          setCities(response.data || []);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedCountryId]);

  const fetchAddresses = async () => {
    const savedData = localStorage.getItem("user");
    const { token } = JSON.parse(savedData);

    try {
      const response = await getUserAddress(token);
      const fetchedAddresses = response.data || [];

      console.log("Fetched Addresses:", fetchedAddresses);
      setAddresses(Array.isArray(fetchedAddresses) ? fetchedAddresses : []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load addresses. Please try again.");
      setAddresses([]);
    }
  };

  const handleOpenDialog = (address = null) => {
    if (address) {
      setFormData(address);
      setSelectedAddress(address);
    } else {
      setFormData({
        address: "",
        city: "",
        postal_code: "",
        country: "",
        is_default: 0,
      });
      setSelectedAddress(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    const savedData = localStorage.getItem("user");
    const { token } = JSON.parse(savedData);

    try {
      await deleteUserAddress(addressId, token);

      setAddresses(addresses.filter((addr) => addr.id !== addressId));
    } catch (err) {
      console.error("Error deleting address:", err);
      setError("Failed to delete the address. Please try again.");
    }
  };

  const handleSaveAddress = async () => {
    setLoading(true);
    setError(null);
    const savedData = localStorage.getItem("user");
    const { token } = JSON.parse(savedData);

    const addressData = {
      ...formData,
      userId: user?.id,
      is_default: formData.is_default === 1 ? 1 : 0,
    };

    try {
      if (addressData.is_default === 1) {
        const updatedAddresses = addresses.map((addr) => ({
          ...addr,
          is_default: addr.id === selectedAddress?.id ? 1 : 0, // set the selected address as default
        }));

        setAddresses(updatedAddresses);

        await Promise.all(
          updatedAddresses.map(async (address) => {
            await updateUserAddress(token, address.id, {
              ...address,
              is_default: address.is_default,
            });
          })
        );
      }

      if (selectedAddress) {
        const updatedAddress = await updateUserAddress(
          token,
          selectedAddress.id,
          addressData
        );
        console.log("Address updated:", updatedAddress);

        await fetchAddresses();
      } else {
        const newAddress = await createUserAddress(addressData, token);
        console.log("Address saved:", newAddress);

        await fetchAddresses();
      }

      handleCloseDialog();
    } catch (err) {
      console.error("Error saving address:", err);
      setError("Failed to save the address. Please try again.");
    } finally {
      setLoading(false);
    }
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Street Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Default Address</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(addresses) && addresses.length > 0 ? (
              addresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.postal_code || ""}</TableCell>
                  <TableCell>
                    {address.is_default === 1 && (
                      <Chip
                        label="DEFAULT"
                        sx={{
                          mr: 1,
                          backgroundColor: "darkgreen",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{address.country}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(address)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteAddress(address.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography>No addresses found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }} component="form">
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Select
                fullWidth
                value={formData.country}
                onChange={(e) => {
                  const country = countries.find(
                    (c) => c.name === e.target.value
                  );
                  setSelectedCountryId(country?.id || "");
                  setFormData({
                    ...formData,
                    country: e.target.value,
                    city: "",
                  });
                }}
                displayEmpty
                // label="Country"
                margin="dense"
              >
                <MenuItem value="" disabled>
                  Select Country
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                displayEmpty
                // label="City"
                margin="dense"
                disabled={!selectedCountryId || cities.length === 0}
              >
                <MenuItem value="" disabled>
                  Select City
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.name_en}>
                    {city.name_en}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <TextField
              fullWidth
              label="Street Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              margin="dense"
            />

            {/* <TextField
              fullWidth
              label="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              margin="dense"
            /> */}

            <TextField
              fullWidth
              label="Postal Code"
              value={formData.postal_code}
              onChange={(e) =>
                setFormData({ ...formData, postal_code: e.target.value })
              }
              margin="dense"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_default === 1}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      is_default: e.target.checked ? 1 : 0,
                    });
                  }}
                />
              }
              label="Set as Default Address"
              sx={{ mt: 2 }}
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
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const savedData = localStorage.getItem("user");
    const { token } = JSON.parse(savedData);

    try {
      const response = await getUserOrders(token);
      const fetchOrders = response.data || [];

      console.log("Fetched Addresses:", fetchOrders);
      setOrders(fetchOrders ? fetchOrders : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Ordered":
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
        Order History
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.order_no}</TableCell>
                <TableCell>
                  {order.order_at
                    ? new Date(order.order_at).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Alert severity={getStatusColor(order.order_status)}>
                    {order.order_status}
                  </Alert>
                </TableCell>
                <TableCell>{order.total_qty}</TableCell>
                <TableCell>
                  ${parseFloat(order.final_total).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Box>
                    {order.sell_lines.map((line, index) => (
                      <Typography key={index} variant="body2">
                        {line.quantity}x {JSON.parse(line.product_name).En} - $
                        {parseFloat(line.line_total).toFixed(2)}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            minWidth: { xs: "100%", md: "230px" },
            "& .MuiTab-root": {
              alignItems: "center",
              justifyContent: { md: "flex-end", xs: "center" },
              textAlign: "left",
              fontWeight: "bold",
              padding: "12px 24px",
              color: "#333",
              transition: "0.5s",
              borderRadius: "8px",
              // marginBottom: 1,
            },
          }}
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

        <Box sx={{ flexGrow: 1, ml: { xs: 0, md: 3 }, mt: { xs: 3, md: 0 } }}>
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
