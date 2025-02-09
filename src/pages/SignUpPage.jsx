import React, { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [language, setLanguage] = useState("jp");

  const navigate = useNavigate();

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (!nickname) {
      alert("ニックネームを入力してください。");
      return;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }
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
          <Typography variant="h5">アカウント作成</Typography>
          <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              label="ニックネーム" //nickname
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="メールアドレス" //mail
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="パスワード" //password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="パスワード（確認）" //password correct
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{ mt: 1, mb: 1, width: "100%" }}
              />
            </LocalizationProvider>
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
              登録する
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            sx={{ mt: 1 }}
          >
            <Link href="/login" variant="body2">
              すでにアカウントをお持ちですか？ ログイン
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
