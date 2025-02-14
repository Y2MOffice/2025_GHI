import React from "react";
import { Container, Typography } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";

const AdminManagePage = () => {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          관리자
        </Typography>
        <Typography>임시</Typography>
        <PaginationComponent />
      </Container>
    </>
  );
};

export default AdminManagePage;
