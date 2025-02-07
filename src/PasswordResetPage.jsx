import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { pink } from "@mui/material/colors";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("すべてのフィールドに入力してください。");
      return;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    // バックエンドなし（仮）
    setSuccess("パスワードが正常に変更されました。");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        パスワードリセット
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="パスワード"
          type="password"
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="パスワード確認"
          type="password"
          fullWidth
          margin="dense"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: pink[100],
            color: "#fff",
            "&:hover": {
              backgroundColor: pink[200],
            },
          }}
        >
          パスワードを変更
        </Button>
      </form>
    </Container>
  );
};

export default PasswordResetPage;
