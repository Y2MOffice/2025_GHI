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
      .catch((err) => console.log("IP 주소 가져오기 실패:", err));

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
        .catch((err) => console.log("국가 정보 가져오기 실패:", err));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://stage-api.glowsnaps.tokyo/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            ipAddress,
            deviceType,
            country,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      } else {
        const responseData = await response.json();
        if (responseData.resultCode === 0 && responseData.data) {
          const token = responseData.data;

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("authenticate", true);

          // 🔹 로그인 후 사용자 정보 요청
          const userResponse = await fetch(
            "https://stage-api.glowsnaps.tokyo/api/users/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (!userResponse.ok) {
            throw new Error(
              `사용자 정보 가져오기 실패: ${userResponse.status}`
            );
          } else {
            const userData = await userResponse.json();
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
          }
        } else {
          setErrorMessage(
            "로그인 실패: " + (responseData.errorMessage || "알 수 없는 오류")
          );
        }
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      setAuthenticate(false);
      setErrorMessage("네트워크 오류가 발생했습니다.");
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
