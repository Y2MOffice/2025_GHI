import { useParams } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ImagePopup from "../components/viewPage(detail)";
import imageList from "../data/List";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const ViewPage = () => {
  const { id } = useParams();
  const image = imageList.find((item) => item.id.toString() === id);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { translations } = useContext(LanguageContext);

  const handleOpenPopup = (index) => {
    setSelectedIndex(index);
    setOpenPopup(true);
  };

  const handleDownloadAll = async () => {
    if (!image || !image.img.length) return;
    const zip = new JSZip();
    const folder = zip.folder("images");

    const imagePromises = image.img.map(async (imgSrc, index) => {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      folder.file(`image${index + 1}.jpg`, blob);
    });

    await Promise.all(imagePromises);
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "images.zip");
  };

  if (!image) {
    return <h2>{translations.nfpage.t1}</h2>;
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#c1a3a3",
        color: "rgb(250, 241, 242)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2}>
        {image.mainImg.map((imgSrc, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Box
              component="img"
              src={imgSrc}
              alt={`Scene ${index + 1}`}
              onClick={() => handleOpenPopup(index)}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {openPopup && (
        <ImagePopup
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          images={image.img}
          startIndex={selectedIndex}
        />
      )}
      <IconButton
        onClick={handleDownloadAll}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#7d5959",
          color: "white",
          "&:hover": {
            backgroundColor: "#6c4f4f",
          },
        }}
      >
        <DownloadIcon />
      </IconButton>
    </Box>
  );
};

export default ViewPage;
