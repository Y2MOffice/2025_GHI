import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Dropzone from "react-dropzone-uploader";
import PhotoCollectionModal from "../../components/Admin_component/PhotoCollectionModal";
import { apiRequest } from "../../utils/api";

const BannerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    imageId: "",
    imageUrl: "",
    redirectUrl: "",
    title: "",
    description: "",
    photoCollectionId: "",
    photoCollectionTitle: "",
    displayOrder: 0,
    isActive: true,
    isDeleted: false,
    displayStartDate: "",
    displayEndDate: "",
  });

  const [localImage, setLocalImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchBannerData = async () => {
      try {
        const data = await apiRequest(`/banners/${id}`);

        setFormData({
          imageId: data.data.imageId || "",
          imageUrl: data.data.imageUrl || "",
          redirectUrl: data.data.redirectUrl || "",
          title: data.data.title || "",
          description: data.data.description || "",
          photoCollectionId: data.data.photoCollectionId || "",
          photoCollectionTitle: data.data.photoCollectionTitle || "",
          displayOrder: data.data.displayOrder || 0,
          isDeleted: data.data.isDeleted || false,
          isActive: data.data.isActive || true,
          displayStartDate: data.data.displayStartDate
            ? dayjs(data.data.displayStartDate)
            : null,
          displayEndDate: data.data.displayEndDate
            ? dayjs(data.data.displayEndDate)
            : null,
        });

        if (data.data.imageUrl) setUploadedImage(true);
      } catch (error) {
        alert("Get Banner Failed");
      }
    };

    fetchBannerData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoCollectionSelect = (id, title) => {
    setFormData({
      ...formData,
      photoCollectionId: id,
      photoCollectionTitle: title,
    });
  };

  const handleImageSelection = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLocalImage(reader.result);
      setSelectedFile(file);
      setUploadedImage(false);
    };
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return alert("Missing File");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const data = await apiRequest(
        "/uploads/banner-image",
        "POST",
        formData,
        true
      );

      const absoluteUrl = `https://stage-api.glowsnaps.tokyo${data.data.url}`;
      setFormData((prev) => ({
        ...prev,
        imageId: data.data.id,
        imageUrl: absoluteUrl,
      }));

      setUploadedImage(true);
      setLocalImage(null);
    } catch (error) {
      alert("Failed Upload");
    }
  };

  const handleImageDelete = () => {
    setLocalImage(null);
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setUploadedImage(false);
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isEditMode ? `/banners?bannerId=${id}` : "/banners";
      const method = isEditMode ? "PATCH" : "POST";

      const data = await apiRequest(endpoint, method, formData);
      alert("Saved");
      navigate("/admin/banners");
    } catch (error) {
      alert("Save Failed");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Box
          sx={{ border: "2px solid #ddd", borderRadius: "12px", p: 3, mt: 4 }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            {isEditMode ? "배너 수정" : "배너 등록"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                {localImage || formData.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={localImage || formData.imageUrl}
                    sx={{ maxHeight: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <label htmlFor="image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      onChange={(e) => handleImageSelection(e.target.files[0])}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        border: "2px dashed gray",
                        p: 2,
                        borderRadius: "8px",
                      }}
                    >
                      <AddIcon sx={{ fontSize: 48, color: "gray" }} />
                      <Typography variant="body2" color="gray">
                        이미지 업로드
                      </Typography>
                    </Box>
                  </label>
                )}
              </Card>
              {!uploadedImage && localImage && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleImageUpload}
                >
                  서버에 이미지 등록
                </Button>
              )}
              {(uploadedImage || localImage) && (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleImageDelete}
                >
                  이미지 삭제
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="배너 제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                선택된 사진집:{" "}
                {formData.photoCollectionTitle
                  ? `: ${formData.photoCollectionTitle}`
                  : "없음"}
              </Typography>
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                사진집 검색
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="표시 순서"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="이동할 URL"
                name="redirectUrl"
                value={formData.redirectUrl}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="시작 날짜"
                value={
                  formData.displayStartDate
                    ? dayjs(formData.displayStartDate)
                    : null
                }
                onChange={(date) =>
                  setFormData({ ...formData, displayStartDate: date })
                }
                maxDate={
                  formData.displayEndDate
                    ? dayjs(formData.displayEndDate)
                    : undefined
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="종료 날짜"
                value={
                  formData.displayEndDate
                    ? dayjs(formData.displayEndDate)
                    : null
                }
                onChange={(date) =>
                  setFormData({ ...formData, displayEndDate: date })
                }
                minDate={
                  formData.displayStartDate
                    ? dayjs(formData.displayStartDate)
                    : undefined
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                }
                label="활성화"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isDeleted}
                    onChange={(e) =>
                      setFormData({ ...formData, isDeleted: e.target.checked })
                    }
                  />
                }
                label="삭제"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            저장
          </Button>
        </Box>
      </Container>
      <PhotoCollectionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handlePhotoCollectionSelect}
      />
    </LocalizationProvider>
  );
};

export default BannerEditPage;
