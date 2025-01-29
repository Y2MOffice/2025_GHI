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

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`パスワードリセットのリンクを ${email} に送信しました。`);
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
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            パスワードをお忘れですか？
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            登録したメールアドレスを入力してください。
            <br />
            パスワードリセットのリンクをお送りします。
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            <Button
              fullWidth
              variant="contained"
              color="error"
              type="submit"
              sx={{ mt: 2, mb: 2 }}
            >
              リセットリンクを送信
            </Button>
          </Box>
          <Link href="/login" variant="body2" sx={{ color: "#FFFFFF" }}>
            ログインページに戻る
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindPasswordPage;
