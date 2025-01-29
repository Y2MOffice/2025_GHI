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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#191919",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#191919",
          color: "#FFFFFF",
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
  const navigate = useNavigate();

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

    // 会員登録完了後にログインページへ移動
    alert(`登録が完了しました。ようこそ、${nickname}さん！`);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            bgcolor: "#202020",
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
              margin="normal"
              required
              fullWidth
              label="ニックネーム"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="パスワード（確認）"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              type="submit"
              sx={{ mt: 2, mb: 2 }}
            >
              登録する
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Link href="/login" variant="body2" sx={{ color: "#FFFFFF" }}>
              すでにアカウントをお持ちですか？ ログイン
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
