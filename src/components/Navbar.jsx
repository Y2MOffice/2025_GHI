import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import Menu from "./Menu.jsx";

// Search Box 스타일 정의 (StyledInputBase까지)
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ({ authenticate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); //검색란 초기하기위한 state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // console.log("dfdf", event.key);
      const keyword = searchTerm.trim();
      // console.log("keyword", keyword);
      if (!keyword) {
        navigate("/search"); // 검색어가 없을 경우 >> SearchPage로 이동
      } else {
        navigate(`/search?q=${keyword}`); // 검색어가 있을 경우 쿼리로 전달
      }
      setSearchTerm(""); // 검색란 초기화
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleSearch}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
      <Menu open={isMenuOpen} onClose={toggleMenu} authenticate={authenticate} />
      <Box sx={{ paddingTop: "64px", backgroundColor:"#191919dd"}}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
