import { useState, useRef } from "react";
import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

const MyPage = () => {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit_account");
  };

  const handlePointHistory = () => {
    navigate("/point-history");
  };

  const handlePhotoPurchaseHistory = () => {
    navigate("/photo-history");
  };

  const handleFavoriteList = () => {
    navigate("/favorites");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "start" },
        padding: 3,
        color: "rgb(250, 241, 242)",
        textShadow: "1px 1px 4px rgb(241, 209, 210)",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "100vh",
      }}
    >
      <Box
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "90%", md: "25%" },
          padding: 3,
          backgroundColor: "#7d5959",
          borderRadius: 2,
          marginBottom: { xs: 3, md: 0 },
          marginRight: { xs: 0, md: 3 },
          textAlign: "center",
        }}
      >
        <Avatar
          alt="Profile Picture"
          src=""
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            color: "rgb(250, 241, 242)",
            textShadow: "2px 2px 4px rgb(241, 209, 210)",
          }}
        >
          名無しさん
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            mb: 2,
            color: "rgb(200, 200, 200)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FilterVintageIcon
            sx={{ fontSize: "24px", color: "rgb(255, 182, 193)" }}
          />{" "}
          <Typography variant="body1">10</Typography>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(241, 209, 210)",
            color: "rgb(241, 209, 210)",
            "&:hover": {
              borderColor: "rgb(250, 241, 242)",
              backgroundColor: "rgba(250, 241, 242, 0.1)",
            },
          }}
          onClick={handleEditClick}
        >
          個人情報変更
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(241, 209, 210)",
            color: "rgb(241, 209, 210)",
            "&:hover": {
              borderColor: "rgb(250, 241, 242)",
              backgroundColor: "rgba(250, 241, 242, 0.1)",
            },
          }}
          onClick={handlePointHistory}
        >
          ポイント決済履歴
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(241, 209, 210)",
            color: "rgb(241, 209, 210)",
            "&:hover": {
              borderColor: "rgb(250, 241, 242)",
              backgroundColor: "rgba(250, 241, 242, 0.1)",
            },
          }}
          onClick={handlePhotoPurchaseHistory}
        >
          写真購入履歴
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "rgb(241, 209, 210)",
            color: "rgb(241, 209, 210)",
            "&:hover": {
              borderColor: "rgb(250, 241, 242)",
              backgroundColor: "rgba(250, 241, 242, 0.1)",
            },
          }}
          onClick={handleFavoriteList}
        >
          お気に入りリスト
        </Button>
      </Box>
    </Box>
  );
};

export default MyPage;
