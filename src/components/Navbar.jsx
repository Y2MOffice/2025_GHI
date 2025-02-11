import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/ABCDE.png";
import Menu from "./Menu.jsx";

const Navbar = ({ setAuthenticate }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#c1a3a3dd",
          boxShadow: "0px 4px 10px rgba(125, 89, 89, 0.7)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/" onClick={() => setSelectedIndex(0)}>
                <img src={logo} alt="Netflix Logo" style={{ height: "40px" }} />
              </Link>
            </Box>
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Menu
        open={isMenuOpen}
        onClose={toggleMenu}
        setAuthenticate={setAuthenticate}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
      <Box sx={{ paddingTop: "64px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
