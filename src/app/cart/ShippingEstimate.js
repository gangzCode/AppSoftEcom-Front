import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, TextField, Button } from "@mui/material";
import { GetCountryList, GetProvinces } from "./CountryData";

function ShippingEstimate({ expanded = false }) {
  const [country, setCountry] = useState("NONE");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("35242");

  const [provinceOptions, setProvinceOptions] = useState([]);

  const handleCalculateShipping = () => {
    // Add logic for calculating shipping here
    console.log(`Calculating shipping for ${country}, ${province}, ZIP: ${zip}`);
  };

  console.log(GetCountryList());
  console.log(GetProvinces("US"));

  return (
    <Box sx={{ mx: "auto", mt: 2 }} display={expanded ? "block" : "none"}>
      {/* Country Selection */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        Country
      </Typography>
      <Select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setProvince("");
          setProvinceOptions(GetProvinces(e.target.value));
        }}
        fullWidth
        MenuProps={{
          sx: {
            ul: {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              border: "1px solid #F2F6FA",
              li: {
                "&.Mui-selected": {
                  bgcolor: "info.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            },
          },
        }}
        sx={{
          mb: 2,
          bgcolor: "bluebutton.main",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: 1,
          transition: "background-color 0.2s ease-in-out",
          "& .MuiSelect-icon": { color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover": {
            bgcolor: "bluebutton.dark",
          },
        }}
      >
        {GetCountryList().map((country) => {
          return <MenuItem value={country.code}>{country.name}</MenuItem>;
        })}
        
        {/* Add more countries as needed */}
      </Select>

      {/* State Selection */}
      {provinceOptions.length > 1 && (
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            State/Province
          </Typography>
          <Select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            fullWidth
            MenuProps={{
              sx: {
                ul: {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  border: "1px solid #F2F6FA",
                  li: {
                    "&.Mui-selected": {
                      bgcolor: "info.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  },
                },
              },
            }}
            sx={{
              mb: 2,
              bgcolor: "bluebutton.main",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 1,
              transition: "background-color 0.2s ease-in-out",
              "& .MuiSelect-icon": { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover": {
                bgcolor: "bluebutton.dark",
              },
            }}
          >
            {provinceOptions.map((province) => (
              <MenuItem value={province}>{province}</MenuItem>
            ))}
          </Select>
        </>
      )}

      {/* Zip/Postal Code Input */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        Zip/Postal Code
      </Typography>
      <TextField
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          bgcolor: "#f5f5f5",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
      />

      {/* Calculate Shipping Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCalculateShipping}
        sx={{
          fontWeight: "bold",
        }}
      >
        Calculate Shipping
      </Button>
    </Box>
  );
}

export default ShippingEstimate;
