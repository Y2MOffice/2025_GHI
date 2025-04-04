import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        },
      },
    },
  },
});

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { translations } = useContext(LanguageContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`${translations.findpw.send1} ${email} ${translations.findpw.send2}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {translations.findpw.question1}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {translations.findpw.question2}
            <br />
            {translations.findpw.question3}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={translations.findpw.maillabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: pink[100],
                color: "#fff",
                "&:hover": {
                  backgroundColor: pink[200],
                },
              }}
            >
              {translations.findpw.button}
            </Button>
          </Box>
          <Link to="/login" variant="body2">
            {translations.findpw.return}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindPasswordPage;
