import { Box, Typography, Grid } from "@mui/material";
import MyPageList from "../data/MyPageList.js";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const FavoriteList = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <Box
      sx={{
        padding: 3,
        color: "rgb(250, 241, 242)",
        backgroundColor: "#c1a3a3",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
      {translations.favli.name}
      </Typography>
      <Grid container spacing={2}>
        {MyPageList.map((item) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={item.img[0]}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="subtitle1">{item.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteList;
