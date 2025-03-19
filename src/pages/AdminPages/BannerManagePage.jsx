import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import BannerTable from "../../components/Admin_component/Table/BannerTable";
import SearchBannerArea from "../../components/Admin_component/SearchBannerArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import { useMediaQuery } from "@mui/material";

const BannerManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [banners, setBanners] = useState([]);
  const [orderBy, setOrderBy] = useState("DisplayOrder");
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  });

  const fetchBanners = async (params = {}) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const filteredParams = Object.fromEntries(
        Object.entries({ ...params, orderBy, ascending }).filter(
          ([_, v]) => v !== ""
        )
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/banners?${queryString}`,
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
      setBanners(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("배너 목록 가져오기 실패:", err);
      setError(err.message);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners(searchParams);
  }, [pagination.page, orderBy, ascending]);

  const handleSortChange = (newOrderBy, newAscending) => {
    setOrderBy(newOrderBy);
    setAscending(newAscending);
    fetchBanners({
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
          {translations.bannerpage.name}
        </Typography>
        <DownloadButton banners={banners} />
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
        <SearchBannerArea
          onSearch={(params) => {
            setSearchParams(params);
            fetchBanners(params);
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <BannerTable
          banners={banners}
          loading={loading}
          error={error}
          onBannerDeleted={() => fetchBanners(searchParams)}
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

export default BannerManagePage;
