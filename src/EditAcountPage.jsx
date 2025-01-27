import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const EditAccount = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2c2c2c",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: "600px" },
          backgroundColor: "#3a3a3a",
          borderRadius: 2,
          padding: { xs: 3, sm: 4 },
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}
        >
          メンバー情報修正
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="名無しさん" //이름칸
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="アイディー"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          type="password"
          variant="outlined"
          label="パスワード"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="電話番号"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="メールアドレス"
          sx={{
            mb: { xs: 2, sm: 3 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#45a045",
            },
          }}
        >
          セーブ
        </Button>
      </Box>
    </Box>
  );
};

export default EditAccount;
