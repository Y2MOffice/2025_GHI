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
  };

  const [formData, setFormData] = useState(resetForm);
  const [hashtagsInput, setHashtagsInput] = useState(""); // 별도의 문자열 상태 추가
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  useEffect(() => {
    if (!id) {
      console.log("등록 모드 진입 (새 컬렉션)");
      setFormData(resetForm);
      setHashtagsInput("");
      return;
    }

    const fetchPhoto = async () => {
      try {
        console.log("사진 데이터 가져오는 중...");
        const { data } = await apiRequest(`/photo-collections/${id}`);
        console.log("불러온 데이터:", data);

        const absoluteCoverImageUrl = data.coverImageUrl.startsWith("http")
          ? data.coverImageUrl
          : `https://stage-api.glowsnaps.tokyo${data.coverImageUrl}`;

        setFormData((prev) => ({
          ...prev,
          artistId: data.artistId || "",
          title: data.title || "",
          description: data.description || "",
          coverImageId: data.coverImageId ?? null,
          coverImageUrl: absoluteCoverImageUrl || "",
          price: data.price || 0,
          hashtags: data.hashtags || [],
          coverImageFile: null,
          photoFiles: [],
          photoPreviews: [],
        }));
        setHashtagsInput((data.hashtags || []).join(", ")); // 초기값 설정
      } catch (err) {
        console.error("사진 목록 가져오기 실패:", err);
        alert("No Data");
        navigate("/admin/photos");
      }
    };

    fetchPhoto();
  }, [id, navigate]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        console.log("아티스트 목록 요청 중...");
        const { data } = await apiRequest(`/artists`);
        console.log("아티스트 목록:", data.items);
        setArtists(data.items || []);
      } catch (err) {
        console.error("아티스트 가져오기 실패:", err);
      } finally {
        setIsLoadingArtists(false);
      }
    };
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`변경됨: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArtistChange = (e) => {
    console.log("아티스트 선택됨:", e.target.value);
    setFormData((prev) => ({ ...prev, artistId: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("커버 이미지 선택:", file.name);
      setFormData((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
        coverImageFile: file,
      }));
    }
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      console.log("커버 이미지 드롭:", file.name);
      setFormData((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
        coverImageFile: file,
      }));
    }
  };

  const handlePhotoFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    console.log(
      "추가 사진 업로드:",
      newFiles.map((f) => f.name)
    );

    setFormData((prev) => ({
      ...prev,
      photoFiles: [...prev.photoFiles, ...newFiles],
      photoPreviews: [...prev.photoPreviews, ...newPreviews],
    }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDropPhotos = (e) => {
    e.preventDefault();
    setPhotoDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    console.log(
      "추가 사진 드롭:",
      newFiles.map((f) => f.name)
    );

    setFormData((prev) => ({
      ...prev,
      photoFiles: [...prev.photoFiles, ...newFiles],
      photoPreviews: [...prev.photoPreviews, ...newPreviews],
    }));
  };

  const handleHashtagsChange = (e) => {
    setHashtagsInput(e.target.value); // 입력값을 실시간으로 업데이트
  };

  const handleHashtagsBlur = () => {
    // 포커스가 벗어날 때 배열로 변환
    const newHashtags = hashtagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({
      ...prev,
      hashtags: newHashtags,
    }));
    console.log("해시태그 업데이트:", newHashtags);
  };

  const handleSubmit = async () => {
    try {
      console.log("폼 제출 시작");
      let { coverImageId, coverImageUrl } = formData;

      if (formData.coverImageFile) {
        const imageForm = new FormData();
        imageForm.append("File", formData.coverImageFile);
        console.log("커버 이미지 업로드 요청");
        const imageRes = await apiRequest(
          "/uploads/cover-image",
          "POST",
          imageForm,
          true
        );
        coverImageId = imageRes.data.id;
        coverImageUrl = `https://stage-api.glowsnaps.tokyo${imageRes.data.url}`;
        console.log("커버 이미지 업로드 완료:", imageRes.data);
      }

      if (!coverImageId) {
        alert("커버 이미지를 선택하거나 업로드해주세요.");
        return;
      }

      let uploadedPhotoFilenames = [];
      if (formData.photoFiles.length > 0) {
        const photoForm = new FormData();
        formData.photoFiles.forEach((file) => {
          photoForm.append("request", file);
        });

        console.log("추가 사진 업로드 요청");
        const photoUploadRes = await apiRequest(
          "/Photos/upload",
          "POST",
          photoForm,
          true
        );
        uploadedPhotoFilenames = photoUploadRes.data || [];
        console.log("업로드된 사진 파일명:", uploadedPhotoFilenames);
      }

      const payload = {
        artistId: formData.artistId,
        title: formData.title,
        description: formData.description,
        coverImageId,
        coverImageUrl,
        price: Number(formData.price),
        hashtags: formData.hashtags,
        photoFileNames: uploadedPhotoFilenames,
      };

      console.log(id ? "수정 요청:" : "등록 요청:", payload);

      if (id) {
        await apiRequest(`/photo-collections/${id}`, "PATCH", payload);
      } else {
        await apiRequest("/photo-collections", "POST", payload);
      }

      alert(id ? "수정되었습니다." : "등록되었습니다.");
      navigate("/admin/photos");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    console.log("현재 formData 상태:", formData);
  }, [formData]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h5" fontWeight="bold">
          {translations.phototable.page}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
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
            ) : artists.length === 0 ? (
              <MenuItem value="">아티스트 없음</MenuItem>
            ) : (
              artists.map((artist) => (
                <MenuItem key={artist.id} value={artist.id}>
                  {artist.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          label={translations.phototable.title}
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
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
                onError={(e) =>
                  console.error("이미지 로드 실패:", formData.coverImageUrl)
                }
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
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
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

        <TextField
          label={translations.phototable.description}
          name="description"
          value={formData.description}
          multiline
          rows={3}
          fullWidth
          onChange={handleChange}
        />

        <TextField
          label="Hashtags"
          name="hashtags"
          fullWidth
          value={hashtagsInput}
          onChange={handleHashtagsChange}
          onBlur={handleHashtagsBlur}
          helperText={translations.phototable.helperText}
        />

        <TextField
          type="number"
          label={translations.phototable.price}
          name="price"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />
        <Typography fontWeight="bold">
          {translations.phototable.uploadPhotos}
        </Typography>
        <Box
          sx={{
            padding: 2,
            border: photoDragOver ? "2px dashed blue" : "2px dashed gray",
            borderRadius: "8px",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setPhotoDragOver(true);
          }}
          onDragLeave={() => setPhotoDragOver(false)}
          onDrop={handleDropPhotos}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoFilesChange}
            style={{ marginTop: "10px" }}
          />

          <Box display="flex" flexWrap="wrap" mt={2} gap={2}>
            {formData.photoPreviews.map((url, index) => (
              <Card
                key={index}
                sx={{ width: 120, height: 120, position: "relative" }}
              >
                <CardMedia
                  component="img"
                  image={url}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setFormData((prev) => {
                      const newPhotoFiles = [...prev.photoFiles];
                      const newPreviews = [...prev.photoPreviews];
                      newPhotoFiles.splice(index, 1);
                      newPreviews.splice(index, 1);
                      console.log("추가 사진 삭제:", index);
                      return {
                        ...prev,
                        photoFiles: newPhotoFiles,
                        photoPreviews: newPreviews,
                      };
                    });
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 0,
                    padding: "4px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                >
                  ×
                </Button>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {id ? translations.phototable.edit : translations.phototable.register}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/admin/photos")}
        >
          {translations.phototable.cancel}
        </Button>
      </Box>
    </Container>
  );
};

export default PhotoEditPage;
