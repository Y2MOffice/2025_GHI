import React, { useState, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { apiRequest } from "../../utils/api";

const DataEditor = () => {
  const { translations } = useContext(LanguageContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]); // 아티스트 목록
  const [selectedArtist, setSelectedArtist] = useState(""); // 선택된 아티스트

  //GET
  useEffect(() => {
    if (!id) return;
    //getphoto
    const getPhoto = async () => {
      try {
        const data = await apiRequest(`/photo-collections/${id}`);
        setFormData(data.data);
        setSelectedArtist(data.data.artistId || "");
      } catch (err) {
        console.error("사진 목록 가져오기 실패:", err);
        setError(err.message);
        alert("데이터가 없거나 삭제되었습니다.");
        navigate("/admin/photos");
      }
    };

    getPhoto();
  }, [id]);

  //Getartist
  useEffect(() => {
    const getArtist = async () => {
      try {
        const data = await apiRequest(`/artists`);
        setArtists(data.data.items);
      } catch (err) {
        console.error("아티스트 목록 가져오기 실패:", err);
      }
    };

    getArtist();
  }, []);

  // 드롭다운에서 아티스트 선택 시 호출
  const handleArtistChange = (event) => {
    const selectedId = event.target.value;
    setSelectedArtist(selectedId);
    setFormData((prev) => ({ ...prev, artistId: selectedId }));
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
        {/* 아티스트 선택 드롭다운 */}
        <FormControl fullWidth>
          <InputLabel>{translations.phototable.artist}</InputLabel>
          <Select value={selectedArtist} onChange={handleArtistChange}>
            {artists.map((artist) => (
              <MenuItem key={artist.id} value={artist.id}>
                {artist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={translations.phototable.title}
          name="title"
          fullWidth
          value={formData.title || ""}
        />
        <Card
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          {formData.cover_image_url ? (
            <CardMedia
              component="img"
              sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              image={formData.cover_image_url}
            />
          ) : (
            <label htmlFor="thumbnail-upload">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="thumbnail-upload"
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
          value={formData.description || ""}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label={translations.phototable.price}
          name="price"
          fullWidth
          value={formData.price || ""}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={formData.isDeleted}
        >
          {translations.phototable.edit}
        </Button>
        <Button variant="outlined" color="secondary">
          {translations.phototable.cancel}
        </Button>
      </Box>
    </Container>
  );
};

export default DataEditor;
