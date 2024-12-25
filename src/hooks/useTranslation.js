import { useCallback, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export const useTranslation = () => {
  const { selectedLanguage } = useContext(LanguageContext);

  const translate = useCallback(
    (jsonString) => {
      try {
        const translations = JSON.parse(jsonString);
        return translations[selectedLanguage?.code] || translations.En || "";
      } catch (error) {
        return jsonString;
      }
    },
    [selectedLanguage]
  );

  return translate;
};
