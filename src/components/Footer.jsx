import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
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
          © 2025 臨時ウェブサイト. All rights reserved.
        </Typography>
        <Box>
          <Link
            href="#"
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
            href="#"
            sx={{
              color: "rgb(250, 241, 242)",
              mx: 1,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Terms of Service
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
  