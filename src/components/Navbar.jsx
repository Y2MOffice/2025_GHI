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

const Navbar = ({ authenticate }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#191919dd" }}>
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
              <Link to="/">
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
        authenticate={authenticate}
      />
      <Box sx={{ paddingTop: "64px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
