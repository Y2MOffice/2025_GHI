import React, { useState, useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
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

const LoginPage = ({ setAuthenticate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  // useEffect(() => {
  //   if (authenticate) {
  //     navigate("/");
  // }, [authenticate, navigate]);

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent refresh
    setAuthenticate(true);
    navigate("/");
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
          }}
        >
          <Typography variant="h5">{translations.loginpage.name}</Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.loginpage.mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.loginpage.pw}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              type="submit"
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: pink[100],
                color: "#fff",
                "&:hover": {
                  backgroundColor: pink[200],
                },
              }}
            >
              {translations.loginpage.login}
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link href="/find-password" variant="body2">
              {translations.loginpage.pwsearch}
            </Link>
            <Link href="/signup" variant="body2">
              {translations.loginpage.regist}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
