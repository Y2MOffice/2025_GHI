import { useRef, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Box, AppBar, Toolbar, IconButton, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./assets/logo.png";
import List from "./components/List.jsx";
import RankingList from "./components/RankingList.jsx";
import Footer from "./components/Footer.jsx";
import Menu from "./components/Menu.jsx";
import mylist from "./mylist";
import rList from "./Rankinglist.js";

const theme = createTheme({
  palette: {
    background: {
      default: "#191919",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        },
      },
    },
  },
});

function App() {
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(contentRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientY - startY;
    contentRef.current.scrollTop = scrollTop - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
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
                <img src={logo} alt="Netflix Logo" style={{ height: "40px" }} />
              </Box>

              <IconButton color="inherit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Menu open={isMenuOpen} onClose={toggleMenu} />
        <Box
          ref={contentRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          sx={{
            paddingTop: "80px",
            height: "100vh",
            overflowY: "auto",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          <List title="Netflix 인기 동영상" data={mylist} />
          <List title="마이리스트" data={mylist} />
          <List title="임시" data={mylist} />
          <List title="임시" data={mylist} />
          <RankingList title="오늘의 영화 TOP10" data={rList} />
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
