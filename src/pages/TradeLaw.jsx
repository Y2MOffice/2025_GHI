import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  Box,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer.jsx";

const LawDisplay = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <Box sx={{ bgcolor: "black", py: 0 }}>
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          px: { xs: 3, sm: 6, md: 8 },
          py: 5,
          borderRadius: 1,
          width: "85%",
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
        {translations.tradelaw.title}
        </Typography>
        <Box component="ul" sx={{ pl: 2, mt: 2 }}>
          <li>
            <Typography
              component="div"
              sx={{
                whiteSpace: "pre-line",
                textAlign: "left",
                fontSize: "0.95rem",
                lineHeight: 1.9,
                fontWeight: "bold"
              }}
            >
              {translations.tradelaw.name}
            </Typography>
            <Typography>
            {translations.tradelaw.nameAns}
              <br />
              {translations.tradelaw.leader}<br />
              〒124-0025
              <br />
              {translations.tradelaw.address}
              <br />
              {translations.tradelaw.email}contact@y2m.jp
            </Typography>
          </li>
        </Box>
      </Box>
    </Box>
  );
};

const Page = () => {
  return (
    <div>
      <LawDisplay />
      <Footer />
    </div>
  );
};

export default Page;
