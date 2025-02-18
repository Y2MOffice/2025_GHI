import React, { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
  styled,
  AppBar,
  Toolbar,
  IconButton,
  Backdrop,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/ABCDE.png";

const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
  backgroundColor: active ? "black" : "inherit",
  color: active ? "pink" : "black",
  "&:hover": {
    color: "black",
    backgroundColor: "lightgray",
  },
}));

const AdminNavbar = () => {
  const { translations } = useContext(LanguageContext);
  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuToggle = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ display: { xs: "flex", md: "none", background: "pink" } }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" src={logo} alt="Logo" sx={{ height: 40 }} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
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
            <ListItemText primary={translations.admin.manage} />
            {openMenus["admin"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledListItemButton>
          <Collapse in={openMenus["admin"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="manage" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.admin.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="manage1" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.admin.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("users")}>
            <ListItemText primary={translations.users.manage} />
            {openMenus["users"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledListItemButton>
          <Collapse in={openMenus["users"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="users" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.users.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="users1" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.users.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("artists")}>
            <ListItemText primary={translations.artists.manage} />
            {openMenus["artists"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledListItemButton>
          <Collapse in={openMenus["artists"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="artists" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.artists.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="artists1" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.artists.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("photos")}>
            <ListItemText primary={translations.photos.manage} />
            {openMenus["photos"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledListItemButton>
          <Collapse in={openMenus["photos"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="photos" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.photos.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="photos1" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.photos.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("purchase")}>
            <ListItemText primary={translations.purchase.manage} />
            {openMenus["purchase"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledListItemButton>
          <Collapse in={openMenus["purchase"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="purchase" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.purchase.sakura} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="sakura" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemText primary={translations.purchase.photobook} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 240 }}>
          <List>
            <StyledListItemButton onClick={() => handleMenuToggle("admin")}>
              <ListItemText primary={translations.admin.manage} />
              {openMenus["admin"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
            <Collapse in={openMenus["admin"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="manage" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.admin.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="manage1" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.admin.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>

            <StyledListItemButton onClick={() => handleMenuToggle("users")}>
              <ListItemText primary={translations.users.manage} />
              {openMenus["users"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
            <Collapse in={openMenus["users"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="users" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.users.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="users1" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.users.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>

            <StyledListItemButton onClick={() => handleMenuToggle("artists")}>
              <ListItemText primary={translations.artists.manage} />
              {openMenus["artists"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
            <Collapse in={openMenus["artists"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="artists" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.artists.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="artists1" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.artists.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>

            <StyledListItemButton onClick={() => handleMenuToggle("photos")}>
              <ListItemText primary={translations.photos.manage} />
              {openMenus["photos"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
            <Collapse in={openMenus["photos"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="photos" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.photos.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="photos1" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.photos.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>

            <StyledListItemButton onClick={() => handleMenuToggle("purchase")}>
              <ListItemText primary={translations.purchase.manage} />
              {openMenus["purchase"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
            <Collapse in={openMenus["purchase"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="purchase" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.purchase.sakura} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="sakura" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemText primary={translations.purchase.photobook} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      <Backdrop
        open={mobileOpen}
        onClick={handleDrawerToggle}
        sx={{ zIndex: 10 }}
      />

      <Box sx={{ display: "flex", width: "100%", marginTop: { xs: 8, md: 0 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminNavbar;
