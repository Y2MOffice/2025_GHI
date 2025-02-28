import React from "react";
import { IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setAuthenticate }) => {
  const navigate = useNavigate();

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
              Authorization: `Bearer ${token}`,
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
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <IconButton
        sx={{
          width: "100%", // ✅ 버튼을 부모 너비에 맞춤
          backgroundColor: "#C9A4A4",
          color: "white",
          borderRadius: "12px",
          padding: "12px",
          transition: "0.3s",
          display: "flex",
          justifyContent: "center", // ✅ 내부 아이콘 + 텍스트 중앙 정렬
          alignItems: "center",
          gap: "8px", // ✅ 아이콘과 텍스트 간격 조정
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#B08C8C",
          },
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleLogout}
      >
        <LogoutIcon fontSize="medium" />
        LogOut
      </IconButton>
    </Box>
  );
};

export default LogoutButton;
