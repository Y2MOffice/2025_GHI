import { useParams } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ImagePopup from "../components/viewPage(detail)";
import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { apiRequest } from "../utils/api";

const ViewPage = () => {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest(`/photo-collections/${id}`);
        if (res.resultCode === 0) {
          setImageData(res.data);
        }
      } catch (err) {
        console.error("error:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleOpenPopup = (index) => {
    setSelectedIndex(index);
    setOpenPopup(true);
  };

  const handleDownloadAll = async () => {
    if (!imageData?.images?.length) return;
    const zip = new JSZip();
    const folder = zip.folder("images");

    const imagePromises = imageData.img.map(async (img, index) => {
      const response = await fetch(`https://stage-api.glowsnaps.tokyo${img.imageUrl}`);
      const blob = await response.blob();
      folder.file(`image${index + 1}.jpg`, blob);
    });

    await Promise.all(imagePromises);
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "images.zip");
  };

  if (!imageData) {
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
        {imageData.images?.map((imgObj, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Box
              component="img"
              src={imgObj.imageUrl}
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
          images={imageData.images.map((img) => `${img.imageUrl}`)}
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
