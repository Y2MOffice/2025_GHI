import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const EditAccount = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "rgb(250, 241, 242)",
        backgroundColor: "rgb(228, 216, 217)",
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
          backgroundColor: "#7d5959",
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
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
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
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
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
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
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
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
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
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#f1d1d2",
            color: "#7d5959",
            "&:hover": {
              backgroundColor: "#faf1f2",
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
