import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  useMediaQuery,
} from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";

import ManageTable from "../../components/Admin_component/Table/ManageTable";
import SearchArea from "../../components/Admin_component/SearchArea";

const AdminManagePage = () => {
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
          관리자 페이지
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
          flexDirection: isMobile ? "column" : "row", // 모바일에서는 세로 정렬
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <SearchArea />
      </Paper>

      {/* 데이터 테이블 영역 */}
      <Paper
        elevation={3}
        sx={{
          p: 1,
          borderRadius: 2,
          mb: 1,
        }}
      >
        <ManageTable />
      </Paper>

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent />
      </Box>
    </Container>
  );
};

export default AdminManagePage;
