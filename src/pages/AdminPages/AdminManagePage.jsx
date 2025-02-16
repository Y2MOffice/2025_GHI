import React, { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Grid, Box, Button, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import DateRangePicker from "../../components/Admin_component/DateRangePicker";
import SearchBar from "../../components/Admin_component/SearchBar";
import ManageTable from "../../components/Admin_component/Table/ManageTable";

const AdminManagePage = () => {
  const { translations } = useContext(LanguageContext);
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h5" mb={1}>
      {translations.adminpage.name}
      </Typography>
      {/* 다운로드 버튼 */}
      <Grid container justifyContent="flex-end" mb={2}>
        <Grid item>
          <DownloadButton />
        </Grid>
      </Grid>
      {/* 기간이랑 검색버튼 */}
      <Grid container spacing={2} alignItems="center" mb={1}>
        <Grid item>
          <DateRangePicker />
        </Grid>
        <Grid item xs>
          <SearchBar />
        </Grid>
      </Grid>

      <ManageTable />

      <Grid container justifyContent="center" alignItems="center" mt={1}>
        <Grid item>
          <PaginationComponent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminManagePage;
