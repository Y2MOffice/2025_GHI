import React, { useState, useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { loginapiRequest } from "../utils/loginapi";
import { apiRequest } from "../utils/api";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [deviceType, setDeviceType] = useState("web");
  const [country, setCountry] = useState("Japan");
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch((err) => console.log("error:", err));

    const userAgent = navigator.userAgent;
    if (/Mobi|Android|iPhone/i.test(userAgent)) {
      setDeviceType("mobile");
    } else {
      setDeviceType("web");
    }

    const savedCountry = localStorage.getItem("country");
    if (savedCountry) {
      setCountry(savedCountry);
    } else {
      fetch("https://ipapi.co/json/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCountry(data.country_name);
          localStorage.setItem("country", data.country_name);
        })
        .catch((err) => console.log("error:", err));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginapiRequest(`/users/login`, "POST", {
        email,
        password,
        ipAddress,
        deviceType,
        country,
      });

      if (response.data.resultCode === 0 && response.data.data) {
        const token = response.data.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("authenticate", true);

        const userData = await apiRequest(`/users/me`);
        console.log(userData)

        if (userData.resultCode === 0 && userData.data) {
          sessionStorage.setItem("user", JSON.stringify(userData.data));
        }
        const userType = userData.data?.userType;
        const isAuthorized = Boolean(
          userType === "admin" || userType === "super_admin"
        );

        setAuthenticate(true);

        setTimeout(() => {
          if (isAuthorized) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 100);
      } else {
        setErrorMessage(
          "failed: " + (response.data.errorMessage || "MissingError"),
          alert(translations.loginpage.message)
        );
      }
    } catch (error) {
      setAuthenticate(false);
      setErrorMessage("NetworkError");
      alert(translations.loginpage.message);
    }
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
            <Link to="/find-password" variant="body2">
              {translations.loginpage.pwsearch}
            </Link>
            <Link to="/signup" variant="body2">
              {translations.loginpage.regist}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
