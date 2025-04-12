import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: "100%",
        backgroundColor: "#7d5959",
        color: "rgb(250, 241, 242)",
        py: 2,
        textAlign: "center",
        boxShadow: "0px -1px 10px rgba(125, 89, 89, 0.7)",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" sx={{ mb: 1 }}>
          © 2025. All rights reserved.
        </Typography>
        <Box>
          <Link
            href="/#/privacy-policy"
            sx={{
              color: "rgb(250, 241, 242)",
              mx: 1,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/#/SpecifiedCommercialLaw"
            sx={{
              color: "rgb(250, 241, 242)",
              mx: 1,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Specified Commercial Law
          </Link>
          <Link
            href="/#/user-guide"
            sx={{
              color: "rgb(250, 241, 242)",
              mx: 1,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            User Guide
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
  