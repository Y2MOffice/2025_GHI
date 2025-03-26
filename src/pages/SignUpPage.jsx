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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { loginapiRequest } from "../utils/loginapi";
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

const SignUpPage = () => {
  const { translations } = useContext(LanguageContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("jp");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!nickname || !firstName || !lastName) {
      setErrorMessage(translations.supage.error1);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(translations.supage.error2);
      return;
    }
    try {
      const log = await loginapiRequest(`/users`, "POST", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phone,
        displayLanguage: language,
        nickname,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      console.log(log.data);
      if (log.data.resultCode != 200) {
        alert("SignUp Fail:"+ log.data.errorMessage);
        return;
      }
      alert("SignUp Success!");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Network Error");
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
          <Typography variant="h5">{translations.supage.name}</Typography>
          <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.name1}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.name2}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.nickname} //nickname
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.mail} //mail
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.password} //password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label={translations.supage.pwdchk} //password correct
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <MuiTelInput
              required
              margin="dense"
              value={phone}
              onChange={handleChange}
              defaultCountry="JP"
              fullWidth
              variant="outlined"
            />
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Select
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="ko">한국어</MenuItem>
                <MenuItem value="jp">日本語</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
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
              {translations.supage.button}
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            sx={{ mt: 1 }}
          >
            <Link to="/login" variant="body2">
              {translations.supage.login}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
