import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import SearchAdminArea from "../../components/Admin_component/SearchAdminArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import ManageTable from "../../components/Admin_component/Table/ManageTable";
import { useMediaQuery } from "@mui/material";

const AdminManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  }); // ✅ 페이지네이션 데이터

  const fetchAdmins = async (params) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const queryString = new URLSearchParams({
        ...params,
        startDate: params.startDate || "",
        endDate: params.endDate || "",
      }).toString();

      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/admins?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("관리자 목록 가져오기 실패:", err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(searchParams);
  }, [pagination.page]); // ✅ 페이지가 변경될 때마다 요청

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
          {translations.adminpage.name}
        </Typography>
        <DownloadButton users={users} />
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
        <SearchAdminArea
          onSearch={(params) => {
            setSearchParams(params);
            fetchAdmins(params);
          }}
        />
      </Paper>

      {/* 데이터 테이블 영역 */}
      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <ManageTable users={users} loading={loading} error={error} />
      </Paper>

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent
          pagination={pagination}
          setPagination={setPagination}
        />
      </Box>
    </Container>
  );
};

export default AdminManagePage;
