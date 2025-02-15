import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../assets/ABCDE.png";

const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
  backgroundColor: active ? "black" : "inherit",
  color: active ? "pink" : "black", 
  "&:hover": {
    color: "black",
    backgroundColor: "lightgray",
  },
}));

const AdminNavbar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleMenuToggle = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ p: 2, bgcolor: "pink", textAlign: "center" }}>
        <NavLink to="/admin" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </NavLink>
      </Box>

      <List>
        <StyledListItemButton onClick={() => handleMenuToggle("admin")}>
          <ListItemText primary="관리자 관리" />
          {openMenus["admin"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledListItemButton>
        <Collapse in={openMenus["admin"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/admin/manage" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="관리자 목록" />
                </StyledListItemButton>
              )}
            </NavLink>
            <NavLink to="/admin/manage1" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="관리자 등록" />
                </StyledListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <StyledListItemButton onClick={() => handleMenuToggle("users")}>
          <ListItemText primary="사용자 관리" />
          {openMenus["users"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledListItemButton>
        <Collapse in={openMenus["users"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/admin/users" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사용자 목록" />
                </StyledListItemButton>
              )}
            </NavLink>
            <NavLink to="/admin/users1" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사용자 등록" />
                </StyledListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <StyledListItemButton onClick={() => handleMenuToggle("artists")}>
          <ListItemText primary="아티스트 관리" />
          {openMenus["artists"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledListItemButton>
        <Collapse in={openMenus["artists"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/admin/artists" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="아티스트 목록" />
                </StyledListItemButton>
              )}
            </NavLink>
            <NavLink to="/admin/artists1" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="아티스트 등록" />
                </StyledListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <StyledListItemButton onClick={() => handleMenuToggle("photos")}>
          <ListItemText primary="사진집 관리" />
          {openMenus["photos"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledListItemButton>
        <Collapse in={openMenus["photos"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/admin/photos" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사진집 목록" />
                </StyledListItemButton>
              )}
            </NavLink>
            <NavLink to="/admin/photos1" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사진집 등록" />
                </StyledListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <StyledListItemButton onClick={() => handleMenuToggle("purchase")}>
          <ListItemText primary="결제 관리" />
          {openMenus["purchase"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledListItemButton>
        <Collapse in={openMenus["purchase"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/admin/purchase" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사쿠라 결제 내역" />
                </StyledListItemButton>
              )}
            </NavLink>
            <NavLink to="/admin/sakura" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <StyledListItemButton active={isActive} sx={{ pl: 4 }}>
                  <ListItemText primary="사진집 결제 내역" />
                </StyledListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default AdminNavbar;
