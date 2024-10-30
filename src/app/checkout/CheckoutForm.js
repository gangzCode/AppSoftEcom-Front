import React from "react";
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
} from "@mui/material";

function CheckoutForm() {
  return (
    <Box sx={{ width: "100%", mx: "auto", p: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
      {/* Contact Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Contact
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 1 }} />
      <FormControlLabel control={<Checkbox />} label="Email me with news and offers" />

      {/* Delivery Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Delivery
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Country/Region</InputLabel>
        <Select label="Country/Region" defaultValue="United States">
          <MenuItem value="United States">United States</MenuItem>
          {/* Add more countries as needed */}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField label="First name (optional)" variant="outlined" fullWidth />
        <TextField label="Last name" variant="outlined" fullWidth />
      </Box>

      <TextField label="Address" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField
        label="Apartment, suite, etc. (optional)"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField label="City" variant="outlined" fullWidth />
        <FormControl fullWidth variant="outlined">
          <InputLabel>State</InputLabel>
          <Select label="State">
            <MenuItem value="CA">CA</MenuItem>
            {/* Add more states as needed */}
          </Select>
        </FormControl>
        <TextField label="ZIP code" variant="outlined" fullWidth />
      </Box>

      <FormControlLabel control={<Checkbox />} label="Save this information for next time" />

      {/* Shipping Method Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Shipping method
      </Typography>
      <Box sx={{ p: 2, bgcolor: "#f0f0f0", borderRadius: 1, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Enter your shipping address to view available shipping methods.
        </Typography>
      </Box>

      {/* Payment Section */}
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Payment
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        All transactions are secure and encrypted.
      </Typography>

      <Box sx={{ p: 2, bgcolor: "#f5faff", border: "1px solid #d0d9e3", borderRadius: 1, mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Credit card
        </Typography>
        <TextField label="Card number" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField label="Expiration date (MM / YY)" variant="outlined" fullWidth />
          <TextField label="Security code" variant="outlined" fullWidth />
        </Box>
        <TextField label="Name on card" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Use shipping address as billing address"
        />
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
        Pay now
      </Button>
    </Box>
  );
}

export default CheckoutForm;
