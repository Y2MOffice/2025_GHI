import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";

const ImageCarousel = ({ data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <Carousel animation="slide">
        {data.map((item, i) => (
          <Paper
            key={i}
            sx={{
              textAlign: "center",
              padding: "10px",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <img
              src={item.mainImg[0]}
              alt={item.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
