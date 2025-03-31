import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import PhotoTable from "../../components/Admin_component/Table/PhotoTable";
import SearchPhotoArea from "../../components/Admin_component/SearchPhotoArea";
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

  const getPhotos = async (params) => {
    setLoading(true);
    try {
      const queryParams = {
        ...params,
        Page: pagination.page,
        PageSize: pagination.pageSize,
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const data = await apiRequest(`/photo-collections?${queryString}`); // /api 제거

      setPhotos(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages || 1,
        page: data.data.page || 1,
        pageSize: data.data.pageSize || 10,
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

  const deletePhoto = async (photoId) => {
    if (!window.confirm("정말 삭제하겠습니까?")) return;
    try {
      await apiRequest(`/photo-collections/${photoId}`, "DELETE"); // /api 제거
      alert("삭제되었습니다.");
      getPhotos(searchParams);
    } catch (err) {
      alert(`삭제 실패:${err.message}`);
    }
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
          {translations.photopage.name}
        </Typography>
        {/* <DownloadButton
          fetchUrl="/photo-collections"
          fileName="Photo-collections.xlsx"
          searchParams={searchParams}
          orderBy={orderBy}
          ascending={ascending}
        /> */}
      </Box>

      <Paper elevation={3} sx={{ p: 1, mb: 1, borderRadius: 2 }}>
        <SearchPhotoArea
          onSearch={(params) => {
            setSearchParams(params);
            setPagination((prev) => ({ ...prev, page: 1 }));
            getPhotos(params);
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <PhotoTable photos={photos} onDelete={deletePhoto} />
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

export default PhotoManagePage;
