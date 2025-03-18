import React, { useRef, useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
} from "@mui/material";
import MovieDetail from "./MovieDetail";
import FullView from "./FullView";
import ConditionalPopup from "./ConditionalPopup";

const List = ({ title, data }) => {
  const rowRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { translations } = useContext(LanguageContext);

  const handleMouseDown = (e) => {
    const row = rowRef.current;
    setIsDragging(false);
    row.isDragging = true;
    row.startX = e.pageX - row.offsetLeft;
    row.scrollLeftStart = row.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const row = rowRef.current;
    if (!row.isDragging) return;
    setIsDragging(true);
    const x = e.pageX - row.offsetLeft;
    const walk = x - row.startX;
    row.scrollLeft = row.scrollLeftStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    const row = rowRef.current;
    row.isDragging = false;
  };

  const handleClick = (item) => {
    if (!isDragging) {
      setSelectedMovie(null);
      setTimeout(() => {
        setSelectedMovie(item);
        setIsFadingOut(false);
      }, 0);
    }
  };

  const closeDetail = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 300);
  };

  const openFullView = () => {
    setIsFullViewOpen(true);
  };

  const closeFullView = () => {
    setIsFullViewOpen(false);
  };

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          color: "rgb(250, 241, 242)",
          textShadow: "2px 2px 4px rgb(125, 89, 89)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgb(241, 209, 210)",
            cursor: "pointer",
            textShadow: "2px 2px 4px rgb(125, 89, 89)",
          }}
          onClick={openFullView}
        >
          {translations.fullview.open}
        </Typography>
      </Box>

      <ImageList
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          overflowX: "auto",
          overflowY: "hidden",
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          "::-webkit-scrollbar": { display: "none" },
          userSelect: "none",
          height: {
            xs: "72%",
            sm: "48%",
            md: "32%",
            lg: "24%",
          },
        }}
        ref={rowRef}
        cols={1}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {data.map((item, index) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleClick(item)}
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "72%",
                sm: "48%",
                md: "32%",
                lg: "24%",
              },
              display: "flex",
              position: "relative",
              "&:hover": { transform: "scale(1.05)" },
              transition: "transform 0.2s",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                left: index === 9 ? "1%" : "5%",
                top: "65%",
                transform: "translateY(-50%)",
                fontSize: index === 9 ? "130px" : "200px",
                fontWeight: "bold",
                // color: "#191919",
                WebkitTextStroke: index === 9 ? "3px white" : "5px white",
                opacity: 0.8,
                zIndex: 1,
                letterSpacing: index === 9 ? "-15px" : null,
                textShadow: "2px 2px 9px rgb(125, 89, 89)",
              }}
            >
              {index + 1}
            </Typography>

            <Box
              component="img"
              src={item.mainImg[0]}
              alt={item.title}
              sx={{
                width: "70%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
                marginLeft: "auto",
                zIndex: 2,
              }}
              onDragStart={(e) => e.preventDefault()}
            />

            <ImageListItemBar
              title={item.title}
              position="bottom"
              sx={{
                position: "absolute",
                width: "67%",
                marginLeft: "auto",
                background:
                  "linear-gradient(to top, rgba(125, 89, 89, 0.8) 0%, rgba(125, 89, 89, 0.2) 70%, rgba(125, 89, 89, 0) 100%)",
                color: "rgb(250, 241, 242)",
                zIndex: 3,
                borderRadius: "5px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={closeDetail}
          isFadingOut={isFadingOut}
        />
      )}
      {showLoginPopup && (
        <ConditionalPopup onClose={() => setShowLoginPopup(false)} />
      )}

      {isFullViewOpen && (
        <FullView
          data={data}
          title={title}
          onClose={closeFullView}
          isFadingOut={isFadingOut}
        />
      )}
    </Box>
  );
};

export default List;
