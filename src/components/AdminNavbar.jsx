import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/ABCDE.png";

// 스타일이 적용된 ListItemButton
const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
  backgroundColor: active ? "black" : "inherit", // 클릭 시 배경 검정
  color: active ? "pink" : "black", // 클릭 시 글자색 분홍
  "&:hover": {
    color: "black",
    backgroundColor: "lightgray", // 호버 시 배경 회색
  },
}));

const AdminNavbar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      }}
    >
      {/* 로고 영역 */}
      <Box sx={{ p: 2, bgcolor: "pink", textAlign: "center" }}>
        <NavLink to="/admin" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </NavLink>
      </Box>

      {/* 네비게이션 리스트 */}
      <List>
        <NavLink to="/admin/manage" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItemButton active={isActive}>
              <ListItemText primary="관리자 관리" />
            </StyledListItemButton>
          )}
        </NavLink>

        <NavLink to="/admin/users" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItemButton active={isActive}>
              <ListItemText primary="사용자 관리" />
            </StyledListItemButton>
          )}
        </NavLink>

        <NavLink to="/admin/artists" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItemButton active={isActive}>
              <ListItemText primary="아티스트 관리" />
            </StyledListItemButton>
          )}
        </NavLink>

        <NavLink to="/admin/photos" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItemButton active={isActive}>
              <ListItemText primary="사진집 관리" />
            </StyledListItemButton>
          )}
        </NavLink>

        <NavLink to="/admin/purchase" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItemButton active={isActive}>
              <ListItemText primary="결제 관리" />
            </StyledListItemButton>
          )}
        </NavLink>
      </List>
    </Drawer>
  );
};

export default AdminNavbar;
