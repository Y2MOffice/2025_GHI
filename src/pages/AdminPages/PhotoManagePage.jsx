import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import PhotoTable from "../../components/Admin_component/Table/PhotoTable";
import SearchPhotoArea from "../../components/Admin_component/SearchArea";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

const PhotoManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  });
  //GET
  const getPhotos = async (params) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(params).toString();
      const data = await apiRequest(`/photo-collections?${queryString}`);

      setPhotos(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("목록 가져오기 실패:", err);
      setError(err.message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos(searchParams);
  }, [pagination.page]);

  //DELETE
  const deletePhoto = async (photoId) => {
    if (!window.confirm("정말 삭제하겠습니까?")) return;
    try {
      await apiRequest(`/photo-collections/${photoId}`, "DELETE");
      alert("삭제되었습니다.");
      getPhotos(searchParams); //삭제하고나서 다시목록 받아옴
    } catch (err) {
      alert(`삭제 실패:${err.message}`);
    }
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
          {translations.photopage.name}
        </Typography>
        <DownloadButton
          fetchUrl="/photo-collections"
          fileName="Photo-collections.xlsx"
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
        <SearchPhotoArea
          onSearch={(params) => {
            setSearchParams(params);
            getPhotos(params);
          }}
        />
      </Paper>

      {/* 데이터 테이블 영역 */}
      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <PhotoTable
          photos={photos}
          loading={loading}
          error={error}
          onDelete={deletePhoto}
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

export default PhotoManagePage;
