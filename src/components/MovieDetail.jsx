import { useState, useRef } from "react";
import { Box, Typography, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MovieDetail = ({ movie, onClose }) => {
  const contentRef = useRef(null);
  const [show, setShow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleWheel = (e) => {
    const content = contentRef.current;
    const isAtTop = content.scrollTop === 0;
    const isAtBottom =
      content.scrollHeight - content.scrollTop === content.clientHeight;

    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseDown = (e) => {
    const content = contentRef.current;
    setIsDragging(true);
    setDragStartY(e.clientY);
    setScrollStartY(content.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const content = contentRef.current;
    const dragDistance = e.clientY - dragStartY;
    content.scrollTop = scrollStartY - dragDistance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
        ref={contentRef}
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
        onWheel={handleWheel}
        onClick={handleClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            background: "linear-gradient(to right, #5c2a36, #1d4437)",
            color: "white",
            borderRadius: 2,
            maxWidth: "400px",
            width: "70%",
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

          <img
            src={movie?.img}
            alt={movie?.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            onDragStart={(e) => e.preventDefault()}
          />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {movie?.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie?.content}
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
};

export default MovieDetail;
