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
  ListItemIcon,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/ABCDE.png";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PaletteIcon from "@mui/icons-material/Palette";
import BrushIcon from "@mui/icons-material/Brush";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutButton from "../LogoutButton";

const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
  backgroundColor: active ? "black" : "inherit",
  color: active ? "pink" : "black",
  "&:hover": {
    color: "black",
    backgroundColor: "lightgray",
  },
}));

const AdminNavbar = ({ setAuthenticate, superUser }) => {
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

  const firstName = JSON.parse(sessionStorage.getItem("user"))?.firstName || "";
  const lastName = JSON.parse(sessionStorage.getItem("user"))?.lastName || "";
  const userName = `${lastName}${firstName}`.trim();

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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            backgroundColor: "pink",
            color: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textShadow: "2px 2px 4px rgb(241, 209, 210)",
            }}
          >
            {userName}
          </Typography>
        </Box>

        <List>
          {superUser && (
            <StyledListItemButton onClick={() => handleMenuToggle("admin")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={translations.admin.manage} />
              {openMenus["admin"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
          )}
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
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.admin.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="users" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.users.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("artists")}>
            <ListItemIcon>
              <ColorLensIcon />
            </ListItemIcon>
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
                    <ListItemIcon>
                      <PaletteIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.artists.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="artistsedit" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <BrushIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.artists.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>

          <StyledListItemButton onClick={() => handleMenuToggle("photos")}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
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
                    <ListItemIcon>
                      <PhotoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.photos.list} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="photosedit" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <AddPhotoAlternateIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.photos.regist} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>
          {superUser && (
            <StyledListItemButton onClick={() => handleMenuToggle("purchase")}>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary={translations.purchase.manage} />
              {openMenus["purchase"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledListItemButton>
          )}
          <Collapse in={openMenus["purchase"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="sakura" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.purchase.sakura} />
                  </StyledListItemButton>
                )}
              </NavLink>
              <NavLink to="purchase" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <StyledListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor: isActive ? "#c1a3a3" : "inherit",
                      color: isActive ? "white" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <ReceiptLongIcon />
                    </ListItemIcon>
                    <ListItemText primary={translations.purchase.photobook} />
                  </StyledListItemButton>
                )}
              </NavLink>
            </List>
          </Collapse>
          <LogoutButton setAuthenticate={setAuthenticate} />
        </List>
      </Drawer>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 240 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              backgroundColor: "pink",
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textShadow: "2px 2px 4px rgb(241, 209, 210)",
              }}
            >
              {userName}
            </Typography>
          </Box>
          <List>
            {superUser && (
              <StyledListItemButton onClick={() => handleMenuToggle("admin")}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary={translations.admin.manage} />
                {openMenus["admin"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </StyledListItemButton>
            )}
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
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.admin.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="users" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemIcon>
                        <GroupsIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.users.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>
            <StyledListItemButton onClick={() => handleMenuToggle("artists")}>
              <ListItemIcon>
                <ColorLensIcon />
              </ListItemIcon>
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
                      <ListItemIcon>
                        <PaletteIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.artists.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="artistsedit" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemIcon>
                        <BrushIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.artists.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>

            <StyledListItemButton onClick={() => handleMenuToggle("photos")}>
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
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
                      <ListItemIcon>
                        <PhotoLibraryIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.photos.list} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="photosedit" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemIcon>
                        <AddPhotoAlternateIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.photos.regist} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>
            {superUser && (
              <StyledListItemButton
                onClick={() => handleMenuToggle("purchase")}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary={translations.purchase.manage} />
                {openMenus["purchase"] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </StyledListItemButton>
            )}
            <Collapse in={openMenus["purchase"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="sakura" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemIcon>
                        <CreditCardIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.purchase.sakura} />
                    </StyledListItemButton>
                  )}
                </NavLink>
                <NavLink to="purchase" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <StyledListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor: isActive ? "#c1a3a3" : "inherit",
                        color: isActive ? "white" : "black",
                      }}
                    >
                      <ListItemIcon>
                        <ReceiptLongIcon />
                      </ListItemIcon>
                      <ListItemText primary={translations.purchase.photobook} />
                    </StyledListItemButton>
                  )}
                </NavLink>
              </List>
            </Collapse>
            <LogoutButton setAuthenticate={setAuthenticate} />
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
