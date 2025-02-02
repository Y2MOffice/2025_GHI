import React from "react";
import { Box, Typography } from "@mui/material";

const UserGuide = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">User Guide</Typography>
    </Box>
  );
};

export default UserGuide;
