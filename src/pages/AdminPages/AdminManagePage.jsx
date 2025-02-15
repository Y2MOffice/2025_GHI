import React from "react";
import { Container, Typography } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import DateRangePicker from "../../components/Admin_component/DateRangePicker";
import SearchBar from "../../components/Admin_component/SearchBar";
import CustomTable from "../../components/Admin_component/Table";

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
        <DownloadButton />
        <DateRangePicker />
        <SearchBar />
        <CustomTable />
        <PaginationComponent />
      </Container>
    </>
  );
};

export default AdminManagePage;
