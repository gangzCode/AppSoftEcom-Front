import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { getCurrencies, getLanguages } from "../services/apiCalls";
import { CurrencyContext } from "../context/CurrencyContext";
import { LanguageContext } from "../context/LanguageContext";

const TopBar = () => {
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const savedLanguage = localStorage.getItem("selectedLanguage");

        const response = await getLanguages();
        console.log(JSON.stringify(response.data) + "Lang response");

        setLanguages(response.data.languages);

        if (savedLanguage) {
          setSelectedLanguage(JSON.parse(savedLanguage));
        } else {
          setSelectedLanguage(response.data.default_language);
          localStorage.setItem(
            "selectedCurrency",
            JSON.stringify(response.data.default_language)
          );
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const savedCurrency = localStorage.getItem("selectedCurrency");
        const response = await getCurrencies();
        setCurrencies(response.data.currencies);

        if (savedCurrency) {
          setSelectedCurrency(JSON.parse(savedCurrency));
        } else {
          setSelectedCurrency(response.data.default_currency);
          localStorage.setItem(
            "selectedCurrency",
            JSON.stringify(response.data.default_currency)
          );
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = languages.find(
      (lang) => lang.code === event.target.value
    );
    setSelectedLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", JSON.stringify(newLanguage));
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = currencies.find(
      (curr) => curr.code === event.target.value
    );
    setSelectedCurrency(newCurrency);
    localStorage.setItem("selectedCurrency", JSON.stringify(newCurrency));
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
            value={selectedLanguage?.code || ""}
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
            {languages.map((lang) => (
              <MenuItem key={lang.id} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
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
            value={selectedCurrency?.code || ""}
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
            {currencies.map((curr) => (
              <MenuItem key={curr.id} value={curr.code}>
                {curr.code}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
