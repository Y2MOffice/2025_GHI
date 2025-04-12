import React, { useState, useEffect, useContext } from "react";
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
import { LanguageContext } from "../../contexts/LanguageContext";
import PhotoCollectionModal from "../../components/Admin_component/PhotoCollectionModal";
import { apiRequest } from "../../utils/api";

const BannerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { translations } = useContext(LanguageContext);

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

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done" || status === "headers_received") {
      handleImageSelection(file);
    }
  };

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
            {isEditMode
              ? translations.banners.edit
              : translations.banners.regist}
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
                  <Dropzone
                    onChangeStatus={handleChangeStatus}
                    accept="image/*"
                    maxFiles={1}
                    multiple={false}
                    canCancel={false}
                    inputContent={translations.phototable.add}
                    styles={{
                      dropzone: {
                        minHeight: 180,
                        border: "2px dashed gray",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      inputLabel: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", 
                        height: 180,
                        color: "gray",
                        fontSize: 14,
                      },
                    }}
                  />
                )}
              </Card>
              {!uploadedImage && localImage && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleImageUpload}
                >
                  {translations.bannerpage.set}
                </Button>
              )}
              {(uploadedImage || localImage) && (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleImageDelete}
                >
                  {translations.bannerpage.delete}
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={translations.banneredit.title}
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {translations.bannerpage.photo}:{" "}
                {formData.photoCollectionTitle
                  ? `: ${formData.photoCollectionTitle}`
                  : "None"}
              </Typography>
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                {translations.bannerpage.search}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={translations.bannerpage.displayOrder}
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={translations.bannerpage.description}
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
                label={translations.bannerpage.redirectURL}
                name="redirectUrl"
                value={formData.redirectUrl}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label={translations.bannerpage.displayStartDate}
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
                label={translations.bannerpage.displayEndDate}
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
                label={translations.bannerpage.isActive}
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
                label={translations.bannerpage.isDeleted}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {translations.bannerpage.save}
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
