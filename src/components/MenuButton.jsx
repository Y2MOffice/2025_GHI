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
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          backgroundColor: index === selectedIndex ? "red" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      />
      <Typography variant="h6">{text}</Typography>
    </ListItemButton>
  );
};

export default MenuButton;
