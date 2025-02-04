import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import ImagePopup from "./components/viewPage(detail)";
import imageList from "./data/List";

const ViewPage = () => {
  const { id } = useParams();
  const image = imageList.find((item) => item.id.toString() === id);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpenPopup = (index) => {
    setSelectedIndex(index);
    setOpenPopup(true);
  };

  if (!image) {
    return <h2>영화를 찾을 수 없습니다.</h2>;
  }

  return (
    <Box sx={{
      padding: 3,
      backgroundColor: "#191919",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <Grid container spacing={2}>
        {image.img.map((imgSrc, index) => (
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
    </Box>
  );
};

export default ViewPage;
