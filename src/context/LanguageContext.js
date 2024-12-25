import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const saved = localStorage.getItem("selectedLanguage");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (selectedLanguage) {
      localStorage.setItem(
        "selectedLanguage",
        JSON.stringify(selectedLanguage)
      );
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
