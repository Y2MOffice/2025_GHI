import React, { useState } from "react";
import {
  Box,
  Typography,
  Slide,
  Divider,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LogoutIcon from "@mui/icons-material/Logout";

function Menu({
  onClose,
  open,
  authenticate,
  selectedIndex,
  setSelectedIndex,
}) {
  const navigate = useNavigate();
  const userName = authenticate ? "ユーザー名" : "ゲスト";
  const [pointCount, setPointCount] = useState(10); //사쿠라포인트

  const handleNavigation = () => {
    if (authenticate) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  const handleAvatarClick = () => {
    navigate("/mypage");
    setSelectedIndex(null);
  };

  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1200,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={onClose}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: {
              xs: "60%",
              sm: "50%",
              md: "40%",
              lg: "30%",
            },
            height: "100vh",
            backgroundColor: "rgb(30, 30, 30)",
            color: "white",
            zIndex: 1200,
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              backgroundColor: "rgb(40, 40, 40)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Avatar
              alt="Profile Picture"
              src=""
              sx={{ marginRight: 2, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />

            <Typography
              variant="h5"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={handleNavigation}
            >
              {userName}
            </Typography>

            <IconButton sx={{ color: "pink" }}>
              <FilterVintageIcon fontSize="large" />
            </IconButton>

            <Typography
              variant="h5"
              sx={{
                marginLeft: 2,
                borderRadius: "10px",
                padding: "5px 10px 5px 0px",
                cursor: "pointer",
              }}
            >
              {pointCount}
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "pink",
              color: "black",
              fontWeight: "bold",
              mb: 1,
              mt: 1,
              "&:hover": {
                backgroundColor: "rgb(255, 182, 193)",
              },
            }}
          >
            桜をチャージする
          </Button>

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
            <MenuButton
              text="ホーム"
              index={0}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(0)}
              path="/"
            />
            <MenuButton
              text="個人情報保護ポリシー"
              index={1}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(1)}
              path="privacy-policy"
            />
            <MenuButton
              text="特定商取引法表示"
              index={2}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(2)}
              path="trade-law"
            />
            <MenuButton
              text="ご利用ガイド"
              index={3}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(3)}
              path="user-guide"
            />

            <IconButton sx={{ color: "white" }}>
              <LogoutIcon fontSize="large" />
              LogOut
            </IconButton>
            <Box
              sx={{
                marginTop: 3,
                padding: 2,
                textAlign: "center",
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              このアプリは作り中です。
            </Box>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
}

export default Menu;
