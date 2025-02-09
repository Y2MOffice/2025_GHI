import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CircularProgress, Box } from "@mui/material";

const ImagePopup = ({ open, onClose, images, startIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState(new Map());

  useEffect(() => {
    if (preloadedImages.has(currentIndex)) {
      setLoading(false);
    } else {
      setLoading(true);
      const img = new Image();
      img.src = images[currentIndex];
      img.onload = () => {
        setLoading(false);
        setPreloadedImages((prev) => new Map(prev).set(currentIndex, img.src));
      };
    }
  }, [currentIndex, images, preloadedImages]);

  useEffect(() => {
    const preloadImages = (index) => {
      if (index < 0 || index >= images.length || preloadedImages.has(index)) return;
      const img = new Image();
      img.src = images[index];
      img.onload = () => {
        setPreloadedImages((prev) => new Map(prev).set(index, img.src));
      };
    };

    preloadImages(currentIndex - 2);
    preloadImages(currentIndex - 1);
    preloadImages(currentIndex + 1);
    preloadImages(currentIndex + 2);
  }, [currentIndex, images, preloadedImages]);

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
        mainSrc={preloadedImages.get(currentIndex) || images[currentIndex]}
        nextSrc={currentIndex < images.length - 1 ? preloadedImages.get(currentIndex + 1) || images[currentIndex + 1] : null}
        prevSrc={currentIndex > 0 ? preloadedImages.get(currentIndex - 1) || images[currentIndex - 1] : null}
        onCloseRequest={onClose}
        onMovePrevRequest={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        onMoveNextRequest={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
        enableZoom={true}
        reactModalStyle={{ overlay: { zIndex: 1300 } }}
        imageStyle={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100vh",
          objectFit: "contain",
          imageRendering: "crisp-edges",
        }}
        toolbarButtons={[
          <span
            key="image-counter"
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              position: "absolute",
              left: "15px",
              top: "10px",
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>,
        ]}
      />
    </>
  );
};

export default ImagePopup;
