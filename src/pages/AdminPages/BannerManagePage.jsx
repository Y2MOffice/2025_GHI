import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import BannerTable from "../../components/Admin_component/Table/BannerTable";
import SearchBannerArea from "../../components/Admin_component/SearchBannerArea";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

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
      const filteredParams = Object.fromEntries(
        Object.entries({
          ...params,
          page: pagination.page,
          orderBy,
          ascending,
        }).filter(([_, v]) => v !== "")
      );
      const queryString = new URLSearchParams(filteredParams).toString();

      const data = await apiRequest(`/banners?${queryString}`);

      setBanners(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
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
    <Box
      sx={{
        mt: 2,
        maxWidth: "1800px",
        width: "100%",
        mx: "auto",
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h5" fontWeight="bold">
          {translations.bannerpage.name}
        </Typography>
        <DownloadButton
          fetchUrl="/banners"
          fileName="Banners.xlsx"
          searchParams={searchParams}
          orderBy={orderBy}
          ascending={ascending}
        />
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
    </Box>
  );
};

export default BannerManagePage;
