import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CircularProgress, Box } from "@mui/material";

const ImagePopup = ({ open, onClose, images, startIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => setLoading(false);
  }, [currentIndex, images]);

  if (!open) return null;

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1400,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <Lightbox
        mainSrc={images[currentIndex]}
        nextSrc={
          currentIndex < images.length - 1 ? images[currentIndex + 1] : null
        }
        prevSrc={currentIndex > 0 ? images[currentIndex - 1] : null}
        onCloseRequest={onClose}
        onMovePrevRequest={() =>
          setCurrentIndex((prev) => Math.max(prev - 1, 0))
        }
        onMoveNextRequest={() =>
          setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
        }
        enableZoom={true}
        reactModalStyle={{ overlay: { zIndex: 1300 } }}
        imageStyle={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100vh",
          objectFit: "contain",
          imageRendering: "crisp-edges",//화질구지가 아니였네
        }}
      />
    </>
  );
};

export default ImagePopup;
