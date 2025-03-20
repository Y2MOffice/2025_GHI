import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import UserTable from "../../components/Admin_component/Table/UserTable";
import SearchUserArea from "../../components/Admin_component/SearchUserArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

const UserManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  });

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    try {
      const filteredParams = Object.fromEntries(
        Object.entries({ ...params, page: pagination.page, orderBy, ascending }).filter(
          ([_, v]) => v !== ""
        )
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      
      const data = await apiRequest(`/users?${queryString}`);

      setUsers(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("유저 목록 가져오기 실패:", err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchParams);
  }, [pagination.page, orderBy, ascending]);

  const handleSortChange = (newOrderBy, newAscending) => {
    setOrderBy(newOrderBy);
    setAscending(newAscending);
    fetchUsers({
      ...searchParams,
      orderBy: newOrderBy,
      ascending: newAscending,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h5" fontWeight="bold">
          {translations.userpage.name}
        </Typography>
        <DownloadButton users={users} />
      </Box>

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
        <SearchUserArea
          onSearch={(params) => {
            setSearchParams(params);
            fetchUsers(params);
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <UserTable
          users={users}
          loading={loading}
          error={error}
          onUserDeleted={() => fetchUsers(searchParams)}
          orderBy={orderBy}
          ascending={ascending}
          onSortChange={handleSortChange}
        />
      </Paper>

      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent
          pagination={pagination}
          setPagination={setPagination}
        />
      </Box>
    </Container>
  );
};

export default UserManagePage;
