import React, { useRef, useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import List from "../components/List.jsx";
import Footer from "../components/Footer.jsx";
import Carousel from "../components/Carousel.jsx";
import { apiRequest } from "../utils/api";

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
  const { translations } = useContext(LanguageContext);
  
  const [groupedData, setGroupedData] = useState({});


  useEffect(() => {
    const fetchGroupedData = async () => {
      try {
        const res = await apiRequest("/photo-collections/grouped-by/artist");
        if (res.resultCode === 0 && res.data) {
          setGroupedData(res.data);
        }
      } catch (err) {
        console.error("Error loading photo collections:", err);
      }
    };

    fetchGroupedData();
  }, []);

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
        <Carousel />
        {Object.entries(groupedData).map(([artist, items], idx) => (
          <List
            key={idx}
            title={artist}
            data={items}
            authenticate={authenticate}
          />
        ))}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
