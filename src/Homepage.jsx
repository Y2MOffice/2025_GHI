import React, { useRef, useState } from "react";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import List from "./components/List.jsx";
import Footer from "./components/Footer.jsx";
import mylist from "./mylist";
import RankingList from "./components/RankingList.jsx";
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

const HomePage = () => {
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        ref={contentRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        sx={{
          height: "calc(100vh - 64px)",
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
    </ThemeProvider>
  );
};

export default HomePage;
