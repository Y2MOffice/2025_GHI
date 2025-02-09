import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ConditionalPopup = ({ onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            background: "linear-gradient(to right, #f1d1d2, #c1a3a3)",
            color: "rgb(250, 241, 242)",
            borderRadius: 2,
            maxWidth: "400px",
            width: "70%",
            padding: "20px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "rgb(250, 241, 242)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ mb: 2, mt: 5, textShadow: "2px 2px 4px rgb(125, 89, 89)" }}
          >
            ログインしてご利用くださいませ
            <br />
            【修正必要】
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7d5959",
              "&:hover": {
                backgroundColor: "#7d5959",
              },
            }}
          >
            ログイン【修正必要】
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default ConditionalPopup;
