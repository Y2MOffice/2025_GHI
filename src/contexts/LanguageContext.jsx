import React, { createContext, useState, useEffect } from "react";
import jp from "../language/jp.yaml";
import ko from "../language/ko.yaml";
import en from "../language/en.yaml";


export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const language =
    JSON.parse(sessionStorage.getItem("user"))?.displayLanguage || "jp";
    const translations = {
      jp,
      ko,
      en,
    }[language] || jp;

  return (
    <LanguageContext.Provider value={{ language, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
