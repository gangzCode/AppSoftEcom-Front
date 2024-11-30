import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

const TopBar = () => {
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("USD");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          background: "#f6f6f8",
          padding: ".4em 8em",
        }}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: "center", lg: "flex-end" }}
        gap={2}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginRight: 0.5 }}
          >
            Language:
          </Typography>
          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiSelect-select": {
                padding: "4px 12px",
              },
              minWidth: 70,
              fontSize: "0.8rem",
            }}
          >
            <MenuItem value="EN">EN</MenuItem>
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="FR">FR</MenuItem>
            <MenuItem value="DE">DE</MenuItem>
          </Select>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginRight: 0.5 }}
          >
            Currency:
          </Typography>
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiSelect-select": {
                padding: "4px 12px",
              },
              minWidth: 70,
              fontSize: "0.8rem",
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
