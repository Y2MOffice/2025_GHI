import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Loading = ({ width, height }) => {
  return (
    <div>
      <Skeleton variant="rectangular" width={width} height={height} />
    </div>
  );
};

export default Loading;
