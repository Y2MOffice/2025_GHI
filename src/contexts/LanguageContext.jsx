import React, { createContext, useState, useEffect } from "react";
import yaml from "js-yaml";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ko");
  const [translations, setTranslations] = useState({
    admin: {},
    users: {},
    artists: {},
    photos: {},
    purchase: {},
    managetable: {},
    conditional: {},
    fullview: {},
    menu: {},
    detail: {},
    adminpage: {},
    editacc: {},
    favli: {},
    findpw: {},
    homepage: {},
    loginpage: {},
    mypage: {},
    nfpage: {},
    prpage: {},
    pphis: {},
    phis: {},
    searchpage: {},
    sucomp: {},
    supage: {},
    artistpage: {},
    artisttable: {},
    photopage:{},
    phototable:{},
    sakurapage:{},
    purchasepage:{},
  });

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const response = await fetch(`/language/${language}.yaml`);
        const text = await response.text();
        const data = yaml.load(text);
        setTranslations(
          data || {
            admin: {},
            users: {},
            artists: {},
            photos: {},
            purchase: {},
          }
        );
      } catch (error) {
        console.error("Error loading language file:", error);
        setTranslations({
          admin: {},
          users: {},
          artists: {},
          photos: {},
          purchase: {},
        });
      }
    };

    loadLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
