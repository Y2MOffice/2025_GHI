import React, { useRef, useState } from "react";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import List from "../components/List.jsx";
import Footer from "../components/Footer.jsx";
import mylist from "../data/List.js";
import RankingList from "../components/RankingList.jsx";
import rList from "../data/Rankinglist.js";
import Carousel from "../components/Carousel.jsx";

const theme = createTheme({
  palette: {
    background: {
      default: "#c1a3a3",
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

const HomePage = (authenticate) => {
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
        <Carousel data={rList} />
        <RankingList
          title="今日の映画TOP10"
          data={rList}
          authenticate={authenticate}
        />
        <List
          title="Netflix人気動画"
          data={mylist}
          authenticate={authenticate}
        />
        <List title="マイリスト" data={mylist} authenticate={authenticate} />
        <List title="임시" data={mylist} authenticate={authenticate} />
        <List title="임시" data={mylist} authenticate={authenticate} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
