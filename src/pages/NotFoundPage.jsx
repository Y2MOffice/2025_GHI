import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#ffb7c5",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {translations.nfpage.t1}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {translations.nfpage.t2}
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ffb7c5",
          color: "white",
          fontSize: "1rem",
          px: 3,
          py: 1,
          "&:hover": {
            backgroundColor: "#ff98b0",
          },
        }}
        onClick={() => navigate("/")}
      >
        {translations.nfpage.t3}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
