import { useRef, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
} from "@mui/material";
import MovieDetail from "./MovieDetail";
import FullView from "./FullView";

const List = ({ title, data }) => {
  const rowRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

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
          color: "white",
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
          variant="body2"
          sx={{ color: "#e50914", cursor: "pointer" }}
          onClick={openFullView}
        >
          전부 보기
        </Typography>
      </Box>

      <ImageList
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: 2,
          p: 2,
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          "::-webkit-scrollbar": { display: "none" },
          userSelect: "none",
        }}
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {data.map((item) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleClick(item)}
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "45%",
                sm: "30%",
                md: "20%",
                lg: "15%",
              },
              aspectRatio: "2 / 3",
              textAlign: "center",
              position: "relative",
              "&:hover": { transform: "scale(1.05)" },
              transition: "transform 0.2s",
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              onDragStart={(e) => e.preventDefault()}
            />

            <ImageListItemBar
              title={item.title}
              position="bottom"
              sx={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
                borderRadius: "5px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose1={closeDetail}
          isFadingOut={isFadingOut}
        />
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
