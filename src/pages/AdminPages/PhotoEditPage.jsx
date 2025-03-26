import React, { useState, useContext, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    artistId: "", // 초기값을 빈 문자열로 변경
    title: "",
    description: "",
    coverImageId: 0,
    coverImageUrl: "",
    price: 0,
    hashtags: [],
    coverImageFile: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (!id) return;
    const getPhoto = async () => {
      try {
        const data = await apiRequest(`/photo-collections/${id}`);
        console.log("API에서 가져온 데이터:", data);
        setFormData({
          ...formData,
          artistId: data.data.artistId || "", // 빈 문자열로 대체 가능
          title: data.data.title || "",
          description: data.data.description || "",
          coverImageId: data.data.coverImageId || 0,
          coverImageUrl: data.data.coverImageUrl || "",
          price: data.data.price || 0,
          hashtags: data.data.hashtags || [],
          coverImageFile: null,
        });
      } catch (err) {
        console.error("사진 목록 가져오기 실패:", err);
        setError(err.message);
        alert("데이터가 없거나 삭제되었습니다.");
        navigate("/admin/photos");
      }
    };
    getPhoto();
  }, [id, navigate]);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const data = await apiRequest(`/artists`);
        console.log("아티스트 데이터:", data);
        setArtists(data.data.items || []); // items가 없으면 빈 배열
        setIsLoadingArtists(false); // 로딩 완료
      } catch (err) {
        console.error("아티스트 목록 가져오기 실패:", err);
        setIsLoadingArtists(false);
      }
    };
    getArtist();
  }, []);

  useEffect(() => {
    console.log("현재 formData 상태:", formData);
  }, [formData]);

  useEffect(() => {
    return () => {
      if (formData.coverImageUrl && formData.coverImageFile) {
        URL.revokeObjectURL(formData.coverImageUrl);
      }
    };
  }, [formData.coverImageUrl, formData.coverImageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArtistChange = (event) => {
    const selectedId = event.target.value;
    console.log("선택된 아티스트 ID:", selectedId);
    setFormData((prev) => ({ ...prev, artistId: selectedId }));
  };

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

  const handleSubmit = async () => {
    try {
      let coverImageId = formData.coverImageId;
      let coverImageUrl = formData.coverImageUrl;

      if (formData.coverImageFile) {
        const imageForm = new FormData();
        imageForm.append("File", formData.coverImageFile);
        const imageResponse = await apiRequest(
          "/uploads/cover-image",
          "POST",
          imageForm,
          true
        );
        console.log("이미지 업로드 응답:", imageResponse);
        coverImageId = imageResponse.data.id;
        coverImageUrl = imageResponse.data.url;
      }

      const jsonData = {
        artistId: formData.artistId || "", // 빈 문자열로 대체 가능
        title: formData.title || "",
        description: formData.description || "",
        coverImageId: coverImageId,
        coverImageUrl: coverImageUrl,
        price: formData.price || 0,
        hashtags: Array.isArray(formData.hashtags) ? formData.hashtags : [],
      };

      console.log("저장하려는 JSON 데이터:", jsonData);

      let response;
      if (id) {
        response = await apiRequest(
          `/photo-collections/${id}`,
          "PATCH",
          jsonData
        );
        console.log("수정 후 서버 응답:", response);
      } else {
        response = await apiRequest("/photo-collections", "POST", jsonData);
        console.log("등록 후 서버 응답:", response);
      }

      alert(
        id
          ? "사진집이 성공적으로 수정되었습니다."
          : "사진집이 성공적으로 등록되었습니다."
      );
      navigate("/admin/photos");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

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
          {isLoadingArtists ? (
            <Typography>아티스트 로딩 중...</Typography>
          ) : (
            <Select
              value={formData.artistId}
              onChange={handleArtistChange}
              disabled={isLoadingArtists || !artists.length}
            >
              {artists.length === 0 ? (
                <MenuItem value="">아티스트 없음</MenuItem>
              ) : (
                artists.map((artist) => (
                  <MenuItem key={artist.id} value={artist.id}>
                    {artist.name}
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        </FormControl>

        <TextField
          label={translations.phototable.title}
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />

        <Card
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            position: "relative",
          }}
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
                이미지 변경
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
                  border: "2px dashed gray",
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
          value={
            Array.isArray(formData.hashtags) ? formData.hashtags.join(", ") : ""
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              hashtags: e.target.value.split(",").map((tag) => tag.trim()),
            }))
          }
          helperText="쉼표(,)로 해시태그를 구분하세요"
        />

        <TextField
          type="number"
          label={translations.phototable.price}
          name="price"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={formData.isDeleted}
          onClick={handleSubmit}
        >
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
