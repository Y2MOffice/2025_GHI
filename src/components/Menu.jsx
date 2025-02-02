import React, { useState } from "react";
import {
  Box,
  Typography,
  Slide,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CategoryList from "./CategoryList";

function Menu({ onClose, open, authenticate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (authenticate) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleAvatarClick = () => {
    //아바타 클릭
  };

  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1200,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={onClose}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: {
              xs: "60%",
              sm: "40%",
              md: "30%",
              lg: "20%",
            },
            height: "100vh",
            backgroundColor: "rgb(30, 30, 30)",
            color: "white",
            zIndex: 1200,
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              backgroundColor: "rgb(40, 40, 40)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >

            <Avatar
              alt="Profile Picture"
              src=""
              sx={{ marginRight: 2, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={handleNavigation}
            >
              {authenticate ? "マイページ" : "ログイン"}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <ChangeCircleIcon />
            </IconButton>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

          <List>
            {CategoryList.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleListItemClick(index)}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    index === selectedIndex
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "5px",
                    backgroundColor:
                      index === selectedIndex ? "red" : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <ListItemButton sx={{ paddingLeft: "20px" }}>
                  <Typography>{text}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Slide>
  );
}

export default Menu;
