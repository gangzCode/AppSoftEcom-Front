import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  getUserAddress,
  getCountries,
  getCities,
  createUserAddress,
  getShippingCharge,
} from "../../services/apiCalls";

function CheckoutForm({ onShippingChargeUpdate }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    newsOffers: false,
  });
  const [loading, setLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [newAddressData, setNewAddressData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
  });
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const fetchUserDataAndAddresses = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          const { token } = userData;

          // First load countries
          const countriesResponse = await getCountries();
          setCountries(countriesResponse.data || []);

          // Then fetch addresses
          const addressResponse = await getUserAddress(token);
          const addressList = addressResponse.data || [];
          setAddresses(addressList);

          // Find default address
          const defaultAddress = addressList.find(
            (addr) => addr.is_default === 1
          );
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);

            // Find country object
            const countryObj = countriesResponse.data.find(
              (c) => c.name === defaultAddress.country
            );

            if (countryObj) {
              // Load cities for the selected country
              const citiesResponse = await getCities(countryObj.id);
              setCities(citiesResponse.data || []);

              // Find city object
              const cityObj = citiesResponse.data.find(
                (c) => c.name_en === defaultAddress.city
              );

              // Update form with all data
              setFormData((prev) => ({
                ...prev,
                address: defaultAddress.address || "",
                country: countryObj.id || "",
                city: cityObj ? cityObj.id : "",
                postal_code: defaultAddress.postal_code || "",
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      }
    };

    fetchUserDataAndAddresses();
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        const { info } = userData;

        setFormData((prev) => ({
          ...prev,
          firstName: info.first_name || "",
          lastName: info.last_name || "",
        }));
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response.data || []);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (formData.country) {
        setCityLoading(true);
        try {
          const response = await getCities(formData.country);

          console.log("Cities:", response.data);
          setCities(response.data || []);
          setCityLoading(false);
        } catch (error) {
          console.error("Error loading cities:", error);
          setCityLoading(false);
        }
      } else {
        setCities([]);
      }
    };
    loadCities();
  }, [formData.country]);

  useEffect(() => {
    const fetchShippingCharge = async () => {
      if (formData.city) {
        try {
          const response = await getShippingCharge(formData.city);

          setShippingCharge(response?.shiping_charge || 0);
        } catch (error) {
          console.error("Error fetching shipping charge:", error);
        }
      }
    };

    fetchShippingCharge();
  }, [formData.city]);

  useEffect(() => {
    if (typeof onShippingChargeUpdate === "function") {
      onShippingChargeUpdate(shippingCharge);
    }
  }, [shippingCharge, onShippingChargeUpdate]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
      ...(name === "country" && { city: "" }),
    }));
  };

  const handleAddressSelect = async (event) => {
    const addressId = event.target.value;
    setSelectedAddressId(addressId);

    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      // First set country
      const countryObj = countries.find(
        (c) => c.name === selectedAddress.country
      );

      // Update form with country first
      setFormData((prev) => ({
        ...prev,
        address: selectedAddress.address || "",
        country: countryObj?.id || "",
        city: "", // Reset city temporarily
      }));

      // Wait for cities to load
      if (countryObj?.id) {
        const citiesResponse = await getCities(countryObj.id);
        const cityObj = citiesResponse.data.find(
          (c) => c.name_en === selectedAddress.city
        );

        // Update city after cities are loaded
        setFormData((prev) => ({
          ...prev,
          city: cityObj?.id || "",
        }));
      }
    }
  };

  const handleOpenAddressDialog = () => {
    setOpenAddressDialog(true);
  };

  const handleCloseAddressDialog = () => {
    setOpenAddressDialog(false);
    setNewAddressData({
      first_name: "",
      last_name: "",
      address: "",
      country: "",
      city: "",
      postal_code: "",
    });
  };

  const handleNewAddressSubmit = async () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const { token } = JSON.parse(userStr);
        await createUserAddress(newAddressData, token);

        // Refresh addresses list
        const response = await getUserAddress(token);
        setAddresses(response.data || []);

        handleCloseAddressDialog();
      } catch (error) {
        console.error("Error creating address:", error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      {addresses.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel>Select Address</InputLabel>
            <Select
              value={selectedAddressId}
              onChange={handleAddressSelect}
              label="Select Address"
            >
              {addresses.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.address}, {address.city}, {address.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleOpenAddressDialog}
            sx={{ minWidth: "auto", px: 3 }}
          >
            Add New
          </Button>
        </Box>
      )}

      {/* Contact Section */}
      {/* <Typography variant="h5" sx={{ mb: 2 }}>
        Contact
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox name="newsOffers" checked={formData.newsOffers} onChange={handleChange} />}
        label="Email me with news and offers"
      /> */}

      {/* Delivery Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Delivery
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Box>

      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        label="Apartment, suite, etc. (optional)"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>City</InputLabel>
          <Select
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country || cityLoading}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name_en}
              </MenuItem>
            ))}
          </Select>
          {cityLoading && (
            <CircularProgress
              size={20}
              sx={{ position: "absolute", right: 25, top: "50%", mt: -1 }}
            />
          )}
        </FormControl>

        <TextField
          label="State"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <TextField
          label="Postal Code"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
      </Box>
      {/* 
      <FormControlLabel control={<Checkbox />} label="Save this information for next time" /> */}

      {/* Add Address Dialog */}
      <Dialog open={openAddressDialog} onClose={handleCloseAddressDialog}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Address"
            value={newAddressData.address}
            onChange={(e) =>
              setNewAddressData((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Country</InputLabel>
            <Select
              value={newAddressData.country}
              onChange={(e) =>
                setNewAddressData((prev) => ({
                  ...prev,
                  country: e.target.value,
                  city: "",
                }))
              }
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>City</InputLabel>
            <Select
              value={newAddressData.city}
              onChange={(e) =>
                setNewAddressData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              disabled={!newAddressData.country}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name_en}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="dense"
            label="State"
            value={newAddressData.state}
            onChange={(e) =>
              setNewAddressData((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Postal Code"
            value={newAddressData.postal_code}
            onChange={(e) =>
              setNewAddressData((prev) => ({
                ...prev,
                postal_code: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddressDialog}>Cancel</Button>
          <Button onClick={handleNewAddressSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CheckoutForm;
