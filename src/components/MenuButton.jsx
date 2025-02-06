import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, ListItemButton } from "@mui/material";

const MenuButton = ({ text, index, selectedIndex, onClick, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(index);
    navigate(path);
  };

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        position: "relative",
        backgroundColor:
          index === selectedIndex ? "rgba(255, 255, 255, 0.1)" : "transparent",
        transition: "background-color 0.3s ease",
        paddingLeft: "20px",
        textShadow: index === selectedIndex ? "2px 2px 4px rgb(125, 89, 89)" : "2px 2px 4px rgb(241,209,210)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          backgroundColor: index === selectedIndex ? "rgb(241,209,210)" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      />
      <Typography
        variant={index === 0 ? "h5" : "body1"}
        sx={{
          color: index === selectedIndex ? "rgb(250,241,242)" : "rgb(125,89,89)",
        }}
      >
        {text}
      </Typography>
    </ListItemButton>
  );
};

export default MenuButton;
