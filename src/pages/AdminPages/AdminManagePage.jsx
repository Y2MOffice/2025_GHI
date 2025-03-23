import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import SearchAdminArea from "../../components/Admin_component/SearchAdminArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import ManageTable from "../../components/Admin_component/Table/ManageTable";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

const AdminManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  });

  const fetchAdmins = async (params) => {
    setLoading(true);
    try {
      const filteredParams = Object.fromEntries(
        Object.entries({
          ...params,
          page: pagination.page,
          orderBy,
          ascending,
        }).filter(([_, v]) => v !== "")
      );
      const queryString = new URLSearchParams(filteredParams).toString();

      const response = await apiRequest(`/admins?${queryString}`);
      setUsers(response.data.items || []);
      setPagination({
        totalPages: response.data.totalPages,
        page: response.data.page,
        pageSize: response.data.pageSize,
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
  }, [pagination.page, orderBy, ascending]);

  const handleSortChange = (newOrderBy, newAscending) => {
    setOrderBy(newOrderBy);
    setAscending(newAscending);
    fetchAdmins({
      ...searchParams,
      orderBy: newOrderBy,
      ascending: newAscending,
    });
  };

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
        <DownloadButton
          fetchUrl="/admins"
          fileName="Admins.xlsx"
          searchParams={searchParams}
          orderBy={orderBy}
          ascending={ascending}
        />
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
        <ManageTable
          users={users}
          loading={loading}
          error={error}
          orderBy={orderBy}
          ascending={ascending}
          onSortChange={handleSortChange}
        />
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
