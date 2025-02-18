import { useState, useRef } from "react";
import { Box, Typography, Grid, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MovieDetail from "./MovieDetail";
import ConditionalPopup from "./ConditionalPopup";

const FullView = ({ data, title, onClose }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [show, setShow] = useState(true);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleMouseDown = (e) => {
    const content = contentRef.current;
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(content.scrollTop);
    setDragged(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDragging) return;
    const content = contentRef.current;
    const distance = e.clientY - startY;
    content.scrollTop = scrollTop - distance;
    if (Math.abs(distance) > 5) setDragged(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  const handleMovieClick = (movie) => {
    if (!dragged) {
      setSelectedMovie(movie);
    }
  };

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleMouseDown(e);
        }}
        onMouseMove={(e) => {
          e.stopPropagation();
          handleMouseMove(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => {
          if (!(selectedMovie || showLoginPopup)) {
            handleClose();
          }
        }}
      >
        <Box
          ref={contentRef}
          onClick={(e) => e.stopPropagation()}
          sx={{
            background: "linear-gradient(to right, #c1a3a3,rgb(182, 137, 137))",
            color: "white",
            borderRadius: 2,
            maxWidth: "1200px",
            width: "90%",
            padding: "20px",
            overflowY: "auto",
            maxHeight: "90%",
            position: "relative",
            userSelect: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            {title}
          </Typography>

          <Grid container spacing={2}>
            {data.map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={6}
                sm={4}
                md={3}
                lg={3}
                onClick={() => handleMovieClick(movie)}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)" },
                    transition: "transform 0.2s",
                  }}
                >
                  <img
                    src={movie.mainImg[0]}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        {/* {showLoginPopup && (
          <ConditionalPopup onClose={() => setShowLoginPopup(false)} />
        )} */}
      </Box>
    </Slide>
  );
};

export default FullView;
