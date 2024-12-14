import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { getCountries, getCities, getShippingCharge } from "../../services/apiCalls";

function ShippingEstimate({ expanded = false }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // Now stores city ID
  const [shippingCharge, setShippingCharge] = useState(0);

  // Fetch countries on component mount
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

  // Fetch cities when a country is selected
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

  const handleCalculateShipping = async () => {
    if (!selectedCountryId || !selectedCity) {
      alert("Please select a country and a city.");
      return;
    }
    try {
      console.log("Fetching shipping charge for city ID:", selectedCity);
  
      const response = await getShippingCharge(selectedCity);
  
      if (response && response.shiping_charge) {
        setShippingCharge(response.shiping_charge); // Set the charge
      } else {
        console.error("Invalid response:", response);
        setShippingCharge(0);
      }
    } catch (error) {
      console.error("Error fetching shipping charge:", error);
      setShippingCharge(0);
    }
  };
  

  return (
    <Box sx={{ mx: "auto", mt: 2 }} display={expanded ? "block" : "none"}>
      {/* Country Selection */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        Country
      </Typography>
      <Select
        value={selectedCountryId}
        onChange={(e) => setSelectedCountryId(e.target.value)}
        fullWidth
        sx={{
          mb: 2,
          bgcolor: "bluebutton.main",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: 1,
          "& .MuiSelect-icon": { color: "#fff" },
        }}
      >
        {countries.map((country) => (
          <MenuItem key={country.id} value={country.id}>
            {country.name}
          </MenuItem>
        ))}
      </Select>

      {/* City Selection */}
      {cities.length > 0 && (
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            City
          </Typography>
          <Select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)} // Use city ID
            fullWidth
            sx={{
              mb: 2,
              bgcolor: "bluebutton.main",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 1,
              "& .MuiSelect-icon": { color: "#fff" },
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name_en}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {/* Calculate Shipping Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCalculateShipping}
        sx={{ fontWeight: "bold" }}
      >
        Calculate Shipping
      </Button>

      {/* Display Shipping Charge */}
      {shippingCharge > 0 && (
        <Typography variant="h6" sx={{ mt: 2 }}>

          Shipping Charge: ${shippingCharge}
        </Typography>
      )}
    </Box>
  );
}

export default ShippingEstimate;           