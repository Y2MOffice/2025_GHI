import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
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
  selectedIndex,
  setAuthenticate,
  setSelectedIndex,
}) {
  const navigate = useNavigate();
  const userName = "ユーザー名";
  const [pointCount, setPointCount] = useState(10); //사쿠라포인트
  const { translations } = useContext(LanguageContext);

  const handleNavigation = () => {
    navigate("/mypage");
  };

  const handleAvatarClick = () => {
    navigate("/mypage");
    setSelectedIndex(null);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.warn("토큰이 없습니다. 이미 로그아웃된 상태일 수 있습니다.");
      } else {
        const response = await fetch(
          "https://stage-api.glowsnaps.tokyo/api/users/logout",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ 인증 토큰 추가
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("서버 로그아웃 실패:", response.status);
        } else {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("authenticate");
          sessionStorage.removeItem("user");

          setAuthenticate(false);
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
    }
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
            backgroundColor: "rgb(193, 163, 163)",
            color: "white",
            zIndex: 1200,
            boxShadow: "2px 0 5px rgba(125, 89, 89, 0.7)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              backgroundColor: "rgb(125, 89, 89)",
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
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                textShadow: "2px 2px 4px rgb(241, 209, 210)",
              }}
              onClick={handleNavigation}
            >
              {userName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgb(125, 89, 89)",
            }}
          >
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
                textShadow: "2px 2px 4px rgb(241, 209, 210)",
              }}
            >
              {pointCount}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "pink",
                color: "black",
                fontWeight: "bold",
                ml: 5,
                mr: 2,
                mb: 1,
                mt: 1,
                textShadow: "2px 2px 4px rgb(125, 89, 89)",
                "&:hover": {
                  backgroundColor: "rgb(255, 182, 193)",
                },
              }}
            >
              {translations.menu.charge}
            </Button>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
            <MenuButton
              text={translations.menu.home}
              index={0}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(0)}
              path="/"
            />
            <MenuButton
              text={translations.menu.policy}
              index={1}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(1)}
              path="privacy-policy"
            />
            <MenuButton
              text={translations.menu.commercial}
              index={2}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(2)}
              path="trade-law"
            />
            <MenuButton
              text={translations.menu.guide}
              index={3}
              selectedIndex={selectedIndex}
              onClick={() => setSelectedIndex(3)}
              path="user-guide"
            />

            <IconButton
              sx={{
                color: "white",
                textShadow: "2px 2px 4px rgb(125, 89, 89)",
              }}
              onClick={handleLogout}
            >
              <LogoutIcon fontSize="large" />
              LogOut
            </IconButton>
            <Box
              sx={{
                marginTop: 3,
                padding: 2,
                textAlign: "center",
                fontSize: "14px",
                textShadow: "2px 2px 4px rgb(125, 89, 89)",
                color: "rgba(255, 255, 255, 0.7)",
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {translations.menu.text}
            </Box>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
}

export default Menu;
