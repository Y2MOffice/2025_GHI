import { Button, createTheme, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const DownloadButton = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" disableElevation>
      {translations.managetable.download}
      </Button>
    </ThemeProvider>
  );
};

export default DownloadButton;
