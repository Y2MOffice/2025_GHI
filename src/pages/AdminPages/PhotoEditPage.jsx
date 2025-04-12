import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Card,
  CardMedia,
  Container,
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LanguageContext } from "../../contexts/LanguageContext";
import { apiRequest } from "../../utils/api";

const PhotoEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 초기 폼 데이터 구조
  const resetForm = {
    artistId: "",
    title: "",
    description: "",
    coverImageId: null,
    coverImageUrl: "",
    price: 0,
    hashtags: [],
    coverImageFile: null,
    photoFiles: [],
    photoPreviews: [],
    existingImages: [],
  };

  const [formData, setFormData] = useState(resetForm);
  const [hashtagsInput, setHashtagsInput] = useState("");
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  // 사진 컬렉션 데이터를 가져오는 함수
  useEffect(() => {
    if (!id) {
      setFormData(resetForm);
      setHashtagsInput("");
      return;
    }

    const fetchPhoto = async () => {
      try {
        const { data } = await apiRequest(`/photo-collections/${id}`);
        const absoluteCoverImageUrl = data.coverImageUrl.startsWith("http")
          ? data.coverImageUrl
          : `https://stage-api.glowsnaps.tokyo${data.coverImageUrl}`;

        const validImages = (data.images || []).filter(
          (img) => img.imageUrl && img.imageUrl.startsWith("http")
        );

        setFormData({
          ...resetForm,
          artistId: data.artistId || "",
          title: data.title || "",
          description: data.description || "",
          coverImageId: data.coverImageId ?? null,
          coverImageUrl: absoluteCoverImageUrl || "",
          price: data.price || 0,
          hashtags: data.hashtags || [],
          existingImages: validImages.map((img, index) => ({
            imageUrl: img.imageUrl,
            caption: img.caption,
            order: index,
          })),
          photoPreviews: validImages.map((img) => img.imageUrl),
        });
        setHashtagsInput((data.hashtags || []).join(", "));
      } catch (err) {
        alert("데이터를 불러올 수 없습니다.");
        navigate("/admin/photos");
      }
    };

    fetchPhoto();
  }, [id, navigate]);

  // 아티스트 목록을 가져오는 함수
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data } = await apiRequest(`/artists`);
        setArtists(data.items || []);
      } catch (err) {
        console.error("아티스트 목록 불러오기 실패:", err);
      } finally {
        setIsLoadingArtists(false);
      }
    };
    fetchArtists();
  }, []);

  // 폼 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 아티스트 선택 처리
  const handleArtistChange = (e) => {
    setFormData((prev) => ({ ...prev, artistId: e.target.value }));
  };

  // 커버 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
        coverImageFile: file,
      }));
    }
  };

  // 커버 이미지 드롭 처리
  const handleDropImage = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
        coverImageFile: file,
      }));
    }
  };

  // 사진 파일 업로드 처리
  const handlePhotoFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      photoFiles: [...prev.photoFiles, ...newFiles],
      photoPreviews: [...prev.photoPreviews, ...newPreviews],
    }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 사진 드롭 처리
  const handleDropPhotos = (e) => {
    e.preventDefault();
    setPhotoDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      photoFiles: [...prev.photoFiles, ...newFiles],
      photoPreviews: [...prev.photoPreviews, ...newPreviews],
    }));
  };

  // 해시태그 입력 처리
  const handleHashtagsChange = (e) => {
    setHashtagsInput(e.target.value);
  };

  // 해시태그 입력 완료 처리
  const handleHashtagsBlur = () => {
    const newHashtags = hashtagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, hashtags: newHashtags }));
  };

  // 사진 삭제 처리
  const handleRemovePhoto = (index) => {
    setFormData((prev) => {
      const newPhotoFiles = [...prev.photoFiles];
      const newPreviews = [...prev.photoPreviews];
      const newExistingImages = [...prev.existingImages];

      if (index < newExistingImages.length) {
        newExistingImages.splice(index, 1);
        newPreviews.splice(index, 1);
      } else {
        const fileIndex = index - newExistingImages.length;
        newPhotoFiles.splice(fileIndex, 1);
        newPreviews.splice(index, 1);
      }

      // order 값 재할당
      const updatedExistingImages = newExistingImages.map((img, i) => ({
        ...img,
        order: i,
      }));

      return {
        ...prev,
        photoFiles: newPhotoFiles,
        photoPreviews: newPreviews,
        existingImages: updatedExistingImages,
      };
    });
  };

  // 폼 제출 처리
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let { coverImageId, coverImageUrl } = formData;

      // 커버 이미지 업로드
      if (formData.coverImageFile) {
        const imageForm = new FormData();
        imageForm.append("File", formData.coverImageFile);
        const imageRes = await apiRequest(
          "/Uploads/cover-image",
          "POST",
          imageForm,
          true
        );
        coverImageId = imageRes.data.id;
        coverImageUrl = `https://stage-api.glowsnaps.tokyo${imageRes.data.url}`;
      }

      if (!coverImageId) {
        alert("커버 이미지를 선택하거나 업로드해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 새 사진 업로드
      let newImages = [];
      if (formData.photoFiles.length > 0) {
        const photoForm = new FormData();
        formData.photoFiles.forEach((file) => {
          photoForm.append("request", file);
        });
        const photoUploadRes = await apiRequest(
          "/Photos/upload",
          "POST",
          photoForm,
          true
        );
        const uploadedPhotoFilenames = photoUploadRes.data || [];
        newImages = uploadedPhotoFilenames.map((filename, index) => ({
          imageUrl: filename,
          caption: "",
          order: formData.existingImages.length + index,
        }));
      }

      // API로 보낼 페이로드 구성
      const payload = {
        artistId: formData.artistId,
        title: formData.title,
        description: formData.description,
        coverImageId,
        coverImageUrl,
        price: Number(formData.price),
        hashtags: formData.hashtags,
        images: [
          ...formData.existingImages.map((img, index) => ({
            imageUrl: img.imageUrl,
            caption: img.caption,
            order: index,
          })),
          ...newImages,
        ],
      };

      if (id) {
        // 기존 컬렉션 수정
        await apiRequest(`/photo-collections/${id}`, "PATCH", payload);
        // 수정 후 데이터 다시 가져오기
        const { data } = await apiRequest(`/photo-collections/${id}`);
        const absoluteCoverImageUrl = data.coverImageUrl.startsWith("http")
          ? data.coverImageUrl
          : `https://stage-api.glowsnaps.tokyo${data.coverImageUrl}`;
        setFormData({
          ...resetForm,
          artistId: data.artistId || "",
          title: data.title || "",
          description: data.description || "",
          coverImageId: data.coverImageId ?? null,
          coverImageUrl: absoluteCoverImageUrl || "",
          price: data.price || 0,
          hashtags: data.hashtags || [],
          existingImages: (data.images || []).map((img, index) => ({
            imageUrl: img.imageUrl,
            caption: img.caption,
            order: index,
          })),
          photoPreviews: (data.images || []).map((img) => img.imageUrl),
        });
        setHashtagsInput((data.hashtags || []).join(", "));
        alert("성공적으로 수정되었습니다.");
      } else {
        // 새 컬렉션 생성
        await apiRequest("/photo-collections", "POST", payload);
        alert("성공적으로 등록되었습니다.");
      }

      navigate("/admin/photos");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" fontWeight="bold" mt={3}>
        {translations.phototable.page}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {/* 아티스트 선택 */}
        <FormControl fullWidth>
          <InputLabel>{translations.phototable.artist}</InputLabel>
          <Select
            value={
              artists.length === 0 ||
              !artists.some((a) => a.id === Number(formData.artistId))
                ? ""
                : formData.artistId
            }
            onChange={handleArtistChange}
            disabled={!artists.length}
            label={translations.phototable.artist}
          >
            {isLoadingArtists ? (
              <MenuItem value="">
                <em>로딩 중...</em>
              </MenuItem>
            ) : (
              artists.map((artist) => (
                <MenuItem key={artist.id} value={artist.id}>
                  {artist.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* 제목 입력 */}
        <TextField
          label={translations.phototable.title}
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />

        {/* 커버 이미지 업로드 */}
        <Typography fontWeight="bold" mb={1}>
          {translations.phototable.coverImage}
        </Typography>

        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            position: "relative",
            border: dragOver ? "2px dashed blue" : "2px dashed gray",
            borderRadius: "8px",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDropImage}
        >
          {formData.coverImageUrl ? (
            <>
              <CardMedia
                component="img"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                image={formData.coverImageUrl}
              />
              <Button
                variant="outlined"
                size="small"
                component="label"
                sx={{ position: "absolute", bottom: 8, right: 8 }}
              >
                {translations.phototable.changeImage}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </>
          ) : (
            <label htmlFor="thumbnail-upload">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="thumbnail-upload"
                onChange={handleImageUpload}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AddIcon sx={{ fontSize: 48, color: "gray" }} />
                <Typography variant="body2" color="gray">
                  {translations.phototable.addthumbnail}
                </Typography>
              </Box>
            </label>
          )}
        </Card>

        {/* 설명 입력 */}
        <TextField
          label={translations.phototable.description}
          name="description"
          value={formData.description}
          multiline
          rows={3}
          fullWidth
          onChange={handleChange}
        />

        {/* 해시태그 입력 */}
        <TextField
          label="해시태그"
          name="hashtags"
          fullWidth
          value={hashtagsInput}
          onChange={handleHashtagsChange}
          onBlur={handleHashtagsBlur}
          helperText={translations.phototable.helperText}
        />

        {/* 가격 입력 */}
        <TextField
          type="number"
          label={translations.phototable.price}
          name="price"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />

        {/* 사진 업로드 */}
        <Typography fontWeight="bold" mb={1}>
          {translations.phototable.uploadPhotos}
        </Typography>

        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
            position: "relative",
            border: photoDragOver ? "2px dashed blue" : "2px dashed gray",
            borderRadius: "8px",
            padding: 2,
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setPhotoDragOver(true);
          }}
          onDragLeave={() => setPhotoDragOver(false)}
          onDrop={handleDropPhotos}
        >
          {formData.photoPreviews.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {formData.photoPreviews.map((url, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 120,
                    height: 120,
                    position: "relative",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={url}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={() => handleRemovePhoto(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      minWidth: 0,
                      padding: "4px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    ×
                  </Button>
                </Card>
              ))}
              {/* 추가 업로드 버튼 */}
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed gray",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                component="label"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handlePhotoFilesChange}
                />
                <AddIcon sx={{ fontSize: 32, color: "gray" }} />
              </Card>
            </Box>
          ) : (
            <label htmlFor="photos-upload">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                id="photos-upload"
                onChange={handlePhotoFilesChange}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AddIcon sx={{ fontSize: 48, color: "gray" }} />
                <Typography variant="body2" color="gray">
                  {translations.phototable.uploadPhotos}
                </Typography>
              </Box>
            </label>
          )}
        </Card>

        {/* 제출 및 취소 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {id
              ? translations.phototable.edit
              : translations.phototable.register}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/admin/photos")}
            disabled={isSubmitting}
          >
            {translations.phototable.cancel}
          </Button>
        </Box>
      </Box>

      {/* 로딩 화면 */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default PhotoEditPage;
