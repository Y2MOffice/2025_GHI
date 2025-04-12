import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import { apiRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ImageCarousel = ({ data }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [bannerData, setBannerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const res = await apiRequest("/banners/active");
        if (res.resultCode === 0 && Array.isArray(res.data)) {
          setBannerData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch banner data", error);
      }
    };

    fetchBannerData();
  }, []);

  const handleImageLoad = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        height: "527px",
      }}
    >
      <Carousel animation="slide">
        {bannerData.map((item, i) => (
          <Paper
            key={i}
            sx={{
              textAlign: "center",
              padding: "10px",
              backgroundColor: "transparent",
              boxShadow: "none",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (item.redirectUrl && item.redirectUrl !== "string") {
                navigate(item.redirectUrl);
              }
            }}
          >
            {!loaded && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#00000000",
                  borderRadius: "10px",
                }}
              />
            )}
            <img
              src={item.imageUrl}
              alt={item.title}
              onLoad={handleImageLoad}
              style={{
                display: loaded ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "contain",
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
