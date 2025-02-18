import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
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
  const { translations } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError(translations.prpage.error1);
      return;
    }

    if (password !== confirmPassword) {
      setError(translations.prpage.error2);
      return;
    }

    // (백엔드 없어서 임시로)
    setSuccess("パスワードが正常に変更されました。");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        {translations.prpage.name}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label={translations.prpage.password}
          type="password"
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={translations.prpage.pwchk}
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
          {translations.prpage.button}
        </Button>
      </form>
    </Container>
  );
};

export default PasswordResetPage;
