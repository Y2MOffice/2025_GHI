import {
  Box,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const SignUpComplete = () => {
  const theme = createTheme({});
  const { translations } = useContext(LanguageContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          {translations.sucomp.t1}
          <br />
          {translations.sucomp.t2}
          <br />
          {translations.sucomp.t3}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            mt: 2,
            backgroundColor: pink[100],
            color: "#fff",
            "&:hover": {
              backgroundColor: pink[200],
            },
          }}
        >
          {translations.sucomp.t4}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpComplete;
