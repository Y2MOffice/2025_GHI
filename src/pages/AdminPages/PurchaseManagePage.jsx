import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import ManageTable from "../../components/Admin_component/Table/ManageTable";
import SearchArea from "../../components/Admin_component/SearchArea";
import { useMediaQuery } from "@mui/material";

const PurchaseManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* 헤더 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h5" fontWeight="bold">
          {translations.purchasepage.name}
        </Typography>
        <DownloadButton />
      </Box>

      {/* 검색 및 필터 영역 */}
      <Paper
        elevation={3}
        sx={{
          p: 1,
          mb: 1,
          display: "flex",
          gap: 1,
          borderRadius: 2,
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <SearchArea />
      </Paper>

      {/* 데이터 테이블 영역 */}
      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <ManageTable />
      </Paper>

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent />
      </Box>
    </Container>
  );
};

export default PurchaseManagePage;
