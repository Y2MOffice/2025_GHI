import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import ArtistTable from "../../components/Admin_component/Table/ArtistTable";
import SearchArtistArea from "../../components/Admin_component/SearchArtistArea";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

const ArtistManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [artists, setArtists] = useState([]);
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

  const fetchArtists = async (params = {}) => {
    setLoading(true);
    try {

      const filteredParams = Object.fromEntries(
        Object.entries({ ...params, page: pagination.page, orderBy, ascending }).filter(
          ([_, v]) => v !== ""
        )
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      
      const data = await apiRequest(`/artists?${queryString}`);

      setArtists(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("유저 목록 가져오기 실패:", err);
      setError(err.message);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(searchParams);
  }, [pagination.page, orderBy, ascending]);

  const handleSortChange = (newOrderBy, newAscending) => {
    setOrderBy(newOrderBy);
    setAscending(newAscending);
    fetchArtists({
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
          {translations.artistpage.name}
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
        <SearchArtistArea
          onSearch={(params) => {
            setSearchParams(params);
            fetchArtists(params);
          }}
        />
      </Paper>

      {/* 데이터 테이블 영역 */}
      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <ArtistTable
          artists={artists}
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

export default ArtistManagePage;
