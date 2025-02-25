import React, { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import SearchArea from "../../components/Admin_component/SearchArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import UserTable from "../../components/Admin_component/Table/UserTable";

const UserManagePage = () => {
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
          {translations.userpage.name}
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
        <UserTable />
      </Paper>

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent />
      </Box>
    </Container>
  );
};

export default UserManagePage;
