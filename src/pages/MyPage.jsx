import React, { useState, useContext, useRef } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

const MyPage = () => {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

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
        backgroundColor: "rgb(228, 216, 217)",
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
          {translations.mypage.b1}
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
          {translations.mypage.b2}
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
          {translations.mypage.b3}
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
          {translations.mypage.b4}
        </Button>
      </Box>
    </Box>
  );
};

export default MyPage;
