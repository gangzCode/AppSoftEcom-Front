import React, { useState, useEffect, useCallback } from "react";
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
  Radio,
  Snackbar,
  Alert,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getUserAddress,
  getCountries,
  getCities,
  createUserAddress,
  getShippingCharge,
  getPaymentTypes,
  placeOrder,
  getCartDetails,
  clearCart,
  getIPAddress,
  validateCoupon,
} from "../../services/apiCalls";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function CheckoutForm({ onShippingChargeUpdate, onDiscountUpdate }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
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
    phoneNumber: "",
    email: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
  });
  const [shippingCharge, setShippingCharge] = useState(0);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderNote, setorderNote] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isGuest, setIsGuest] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [dialogCities, setDialogCities] = useState([]);
  const [dialogCityLoading, setDialogCityLoading] = useState(false);
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    setIsGuest(!userStr);

    const fetchUserDataAndAddresses = async () => {
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          const { token } = userData;

          const countriesResponse = await getCountries();
          setCountries(countriesResponse.data || []);

          const addressResponse = await getUserAddress(token);
          const addressList = addressResponse.data || [];
          setAddresses(addressList);

          const defaultAddress = addressList.find(
            (addr) => addr.is_default === 1
          );
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);

            const countryObj = countriesResponse.data.find(
              (c) => c.name === defaultAddress.country
            );

            if (countryObj) {
              const citiesResponse = await getCities(countryObj.id);
              setCities(citiesResponse.data || []);

              const cityObj = citiesResponse.data.find(
                (c) => c.name_en === defaultAddress.city
              );

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
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const countriesResponse = await getCountries();
          setCountries(countriesResponse.data || []);
        } catch (error) {
          console.error("Error loading countries:", error);
        } finally {
          setLoading(false);
        }
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
          email: info.email || "",
          phoneNumber: info.phone || "",
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

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await getPaymentTypes();
        setPaymentTypes(response.data || []);
        if (response.data?.length > 0) {
          setSelectedPaymentType(response.data[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching payment types:", error);
      }
    };
    fetchPaymentTypes();
  }, []);

  useEffect(() => {
    const loadDialogCities = async () => {
      if (newAddressData.country) {
        setDialogCityLoading(true);
        try {
          const response = await getCities(newAddressData.country);
          setDialogCities(response.data || []);
        } catch (error) {
          console.error("Error loading cities:", error);
        } finally {
          setDialogCityLoading(false);
        }
      } else {
        setDialogCities([]);
      }
    };

    loadDialogCities();
  }, [newAddressData.country]);

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
      const countryObj = countries.find(
        (c) => c.name === selectedAddress.country
      );

      setFormData((prev) => ({
        ...prev,
        address: selectedAddress.address || "",
        country: countryObj?.id || "",
        city: "",
      }));

      if (countryObj?.id) {
        const citiesResponse = await getCities(countryObj.id);
        const cityObj = citiesResponse.data.find(
          (c) => c.name_en === selectedAddress.city
        );

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

        const countryObj = countries.find(
          (c) => c.id === newAddressData.country
        );
        const cityObj = dialogCities.find((c) => c.id === newAddressData.city);

        const addressData = {
          ...newAddressData,
          country: countryObj?.name || "",
          city: cityObj?.name_en || "",
        };

        await createUserAddress(addressData, token);

        const response = await getUserAddress(token);
        setAddresses(response.data || []);

        setSnackbar({
          open: true,
          message: "Address added successfully",
          severity: "success",
        });

        handleCloseAddressDialog();
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || "Failed to add address",
          severity: "error",
        });
      }
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.postal_code) {
      newErrors.postal_code = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  useEffect(() => {
    if (isGuest) {
      const isValid = validateForm();
      setIsFormValid(isValid);
    }
  }, [formData, isGuest, validateForm]);

  let total;

  const handleOrderSuccess = (response) => {
    setOrderDetails(response);
    setOrderSuccessOpen(true);
  };

  const handleOrderSubmit = async () => {
    setOrderProcessing(true);
    try {
      const cartResponse = await getCartDetails();
      const cartItems = cartResponse.data || [];

      total = cartItems.reduce(
        (sum, item) =>
          sum + parseFloat(item.unit_price) * parseFloat(item.quantity),
        0
      );

      const orderData = {
        final_total: total,
        shipping_charge: shippingCharge,
        note: orderNote || "",
        products: cartItems.map((item) => ({
          line_id: item.card_id,
          quantity: item.quantity,
          discount: item.discount || "",
        })),
      };

      const response = await placeOrder(orderData);
      handleOrderSuccess(response);

      const userStr = localStorage.getItem("user");
      if (userStr) {
        const { token } = JSON.parse(userStr);
        await clearCart(token);
      } else {
        const ipAddress = await getIPAddress();
        await clearCart(null, ipAddress);
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to place order",
        severity: "error",
      });
    } finally {
      setOrderProcessing(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleApplyDiscount = async () => {
    if (!discountCode) return;

    setIsApplyingDiscount(true);
    setDiscountError("");

    try {
      const response = await validateCoupon(discountCode);
      const couponData = response.data;

      const isExpired = new Date(couponData.expired_at) < new Date();
      if (isExpired) {
        setDiscountError("This coupon has expired");
        return;
      }

      const discountAmount =
        couponData.type === "fixed"
          ? parseFloat(couponData.value)
          : (parseFloat(couponData.value) / 100) * total;

      setDiscount(discountAmount);
      onDiscountUpdate(discountAmount);
    } catch (error) {
      setDiscountError(error.message || "Invalid coupon code");
    } finally {
      setIsApplyingDiscount(false);
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
      {
        !isGuest && addresses.length > 0 && (
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
              Add New Address
            </Button>
          </Box>
        ) /* || (
        <Button
          variant="contained"
          fullWidth
          onClick={handleOpenAddressDialog}
          sx={{ minWidth: "auto", px: 3 }}
        >
          Add New Address
        </Button> }*/
      }

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
        Shipping Address
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={!isGuest && selectedAddressId}
          error={!!errors.country}
          helperText={errors.country}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        name="address"
        value={formData.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
        disabled={!isGuest && selectedAddressId}
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
            disabled={(!isGuest && selectedAddressId) || !formData.country}
            error={!!errors.city}
            helperText={errors.city}
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
          label="Postal Code"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          error={!!errors.postal_code}
          helperText={errors.postal_code}
          disabled={!isGuest && selectedAddressId}
        />
      </Box>

      {/* User Information Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        User Information
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          disabled={!isGuest && selectedAddressId}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          disabled={!isGuest && selectedAddressId}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={!isGuest && selectedAddressId}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          disabled={!isGuest && selectedAddressId}
        />
      </Box>
      {/* Shipping Method Section */}
      {/* <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Shipping method
      </Typography>
      <Box sx={{ p: 2, bgcolor: "#f0f0f0", borderRadius: 1, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Enter your shipping address to view available shipping methods.
        </Typography>
      </Box> */}

      {/* Payment Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Payment Method
      </Typography>
      <Box sx={{ p: 2, bgcolor: "#f5faff", borderRadius: 1 }}>
        {paymentTypes.map((type) => (
          <FormControlLabel
            key={type.id}
            control={
              <Radio
                checked={selectedPaymentType === type.id.toString()}
                onChange={(e) => setSelectedPaymentType(e.target.value)}
                value={type.id}
                name="payment-type"
              />
            }
            label={type.name}
          />
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Discount Code
      </Typography>
      <Box
        sx={{
          p: 2,
          bgcolor: "#f5faff",
          borderRadius: 1,
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code..."
          error={!!discountError}
          helperText={discountError}
          disabled={isApplyingDiscount}
        />
        <Button
          variant="contained"
          onClick={handleApplyDiscount}
          disabled={!discountCode || isApplyingDiscount}
          sx={{ minWidth: "auto", px: 3 }}
        >
          {isApplyingDiscount ? <CircularProgress size={24} /> : "Apply"}
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Order Notes
      </Typography>
      <Box sx={{ p: 2, bgcolor: "#f5faff", borderRadius: 1 }}>
        <TextField
          fullWidth
          multiline
          value={orderNote}
          onChange={(e) => {
            setorderNote(e.target.value);
          }}
          placeholder="Add a note to your order..."
          minRows={4}
          maxRows={7}
          variant="outlined"
        />
      </Box>

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
              disabled={!newAddressData.country || dialogCityLoading}
            >
              {dialogCities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name_en}
                </MenuItem>
              ))}
            </Select>
            {dialogCityLoading && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  right: 25,
                  top: "50%",
                  mt: -1,
                }}
              />
            )}
          </FormControl>
          {/* <TextField
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
          /> */}
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

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleOrderSubmit}
          disabled={
            orderProcessing ||
            !selectedPaymentType ||
            (!isGuest && !selectedAddressId) ||
            (isGuest && !isFormValid)
          }
          sx={{
            minWidth: 200,
            py: 1.5,
          }}
        >
          {orderProcessing ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Order Now"
          )}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={orderSuccessOpen} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", pt: 4 }}>
          Order Confirmed!
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "success.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Thank you for shopping with AppSoft!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              We're excited to let you know that your order #
              {orderDetails?.order_no} has been successfully placed.
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              If you have any questions about your order or need assistance,
              feel free to contact us.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Contact Us: +94 777 123 456
              <br />
              Email: support@appsoft.com
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              setOrderSuccessOpen(false);
              navigate("/");
            }}
            sx={{ minWidth: 200 }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CheckoutForm;
