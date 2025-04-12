import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import Dropzone from "react-dropzone-uploader";

const ArtistEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtags: [],
    startDate: "",
    imageId: "",
    profileImageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [localImage, setLocalImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const data = await apiRequest(`/artists/${id}`);

        setFormData({
          name: data.data.name,
          description: data.data.description,
          hashtags: Array.isArray(data.data.hashtags) ? data.data.hashtags : [],
          startDate: data.data.createdAt,
        });
        setLoading(false);
      } catch (error) {
        alert("Loading Failed");
        setLoading(false);
      }
    };

    if (id) {
      fetchArtistData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleHashtagChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: e.target.value
        ? e.target.value.split(",").map((tag) => tag.trim())
        : [],
    }));
  };

  const handleChangeStatus = ({ file }, status) => {
    if (status === "done" || status === "headers_received") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setLocalImage(reader.result);
        setSelectedFile(file);
        setUploadedImage(false);
      };
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return alert("파일을 선택해주세요.");

    const uploadForm = new FormData();
    uploadForm.append("file", selectedFile);

    try {
      const res = await apiRequest(
        "/uploads/cover-image",
        "POST",
        uploadForm,
        true
      );
      const absoluteUrl = `https://stage-api.glowsnaps.tokyo${res.data.url}`;
      setFormData((prev) => ({
        ...prev,
        imageId: res.data.id,
        profileImageUrl: absoluteUrl,
      }));
      setUploadedImage(true);
      setLocalImage(null);
    } catch (err) {
      alert("이미지 업로드 실패");
    }
  };

  const handleImageDelete = () => {
    setLocalImage(null);
    setFormData((prev) => ({ ...prev, profileImageUrl: "", imageId: "" }));
    setUploadedImage(false);
  };

  const handleSubmit = async () => {
    try {
      await apiRequest(`/artists/${id}`, "PATCH", {
        name: formData?.name || "",
        description: formData?.description || "",
        hashtags: formData?.hashtags || [],
        imageId: formData.imageId || "",
        profileImageUrl: formData.profileImageUrl || "",
      });

      alert("Edit Success");
      navigate("/admin/artists");
    } catch (error) {
      alert("Edit Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {translations.artisttable.page}
            </Typography>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            >
              {localImage || formData.profileImageUrl ? (
                <CardMedia
                  component="img"
                  image={localImage || formData.profileImageUrl}
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
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleImageUpload}
              >
                {translations.phototable.register}
              </Button>
            )}

            {(uploadedImage || localImage) && (
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handleImageDelete}
              >
                {translations.usereditpage.delete}
              </Button>
            )}
            <TextField
              label={translations.artisttable.name}
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label={translations.artisttable.description}
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
              multiline
              rows={20}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label={translations.artisttable.hashtag}
              name="hashtags"
              value={
                formData?.hashtags.length > 0
                  ? formData.hashtags.join(", ")
                  : ""
              }
              onChange={handleHashtagChange}
              fullWidth
              sx={{ mb: 3 }}
              placeholder={translations.artisttable.placeholder}
            />
            <TextField
              label={translations.artisttable.startDate}
              name="startDate"
              value={formData?.startDate || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mb: 3 }}
            />
          </>
        )}
      </Box>

      {!loading && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {translations.artisttable.edit}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/admin/artistmanage")}
          >
            {translations.artisttable.cancel}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ArtistEditPage;
