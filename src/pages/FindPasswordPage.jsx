import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
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
    alert(`${translations.findpw.a1} ${email} ${translations.findpw.a2}`);
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
            {translations.findpw.q1}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {translations.findpw.q2}
            <br />
            {translations.findpw.q3}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={translations.findpw.l1}
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
              {translations.findpw.b1}
            </Button>
          </Box>
          <Link href="/login" variant="body2">
          {translations.findpw.return}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindPasswordPage;
