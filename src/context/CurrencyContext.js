import React, { createContext, useState, useContext, useEffect } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const saved = localStorage.getItem("selectedCurrency");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (selectedCurrency) {
      localStorage.setItem(
        "selectedCurrency",
        JSON.stringify(selectedCurrency)
      );
    }
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
