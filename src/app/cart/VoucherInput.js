import React, { useState } from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";

function VoucherInput() {
  const [discountCode, setDiscountCode] = useState("");

  const handleApply = () => {
    // Handle discount code application logic here
    console.log("Discount Code Applied:", discountCode);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
        // maxWidth: 400,
        mx: "auto",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter discount code..."
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        fullWidth
        InputProps={{
          sx: { backgroundColor: "#f5f5f5", border: "none", padding: 0 },
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                height: "56px",
                maxHeight: "none",
                m: 0,
              }}
            >
              <Button
                variant="contained"
                onClick={handleApply}
                sx={{
                  color: "#fff",
                  borderRadius: "0 4px 4px 0",
                  height: "100%",
                }}
              >
                Apply
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: "none" },
          },
        }}
      />
    </Box>
  );
}

export default VoucherInput;
