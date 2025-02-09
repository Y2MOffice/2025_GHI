import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#ffb7c5",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        ページが見つかりません。
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        お探しのページは存在しないか、削除されました。
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ffb7c5",
          color: "white",
          fontSize: "1rem",
          px: 3,
          py: 1,
          "&:hover": {
            backgroundColor: "#ff98b0",
          },
        }}
        onClick={() => navigate("/")}
      >
        ホームに戻る
      </Button>
    </Box>
  );
};

export default NotFoundPage;
