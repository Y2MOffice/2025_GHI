import { Button, createTheme, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const DownloadButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" disableElevation>
        ダウンロード
      </Button>
    </ThemeProvider>
  );
};

export default DownloadButton;
