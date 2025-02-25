import React, { useState, useContext } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dropzone from "react-dropzone-uploader";
import { LanguageContext } from "../../contexts/LanguageContext";

// 사진집 데이터
const photoData = {
  id: "0",
  artist_id: "0",
  title: "TWICE 1st Photobook: ONE IN A MILLION",
  description: "트와이스의 첫 번째 공식 사진집, 멤버들의 다양한 매력을 담았다.",
  cover_image_url: "",
  price: "39.99",
  created_at: "2024-02-21",
  updated_at: "2024-02-21",
};

// 아티스트 데이터
const artistData = [
  {
    id: "0",
    name: "트와이스",
  },
  {
    id: "1",
    name: "BTS",
  },
  {
    id: "2",
    name: "뉴진스",
  },
  {
    id: "3",
    name: "세븐틴",
  },
  {
    id: "4",
    name: "아이브",
  },
];

const DataEditor = () => {
  const { translations } = useContext(LanguageContext);
  const [formData, setFormData] = useState(photoData);
  const [files, setFiles] = useState([]);

  const [photoList, setPhotoList] = useState([
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, cover_image_url: imageUrl }));
    }
  };

  // ✅ `react-dropzone-uploader`에서 사용하는 이벤트 핸들러
  const handleChangeStatus = ({ file, meta }, status) => {
    console.log(status, meta);

    if (status === "done") {
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const handleSubmit = (files, allFiles) => {
    console.log(
      "업로드 완료된 파일 목록:",
      files.map((f) => f.meta)
    );
    const newPhotos = files.map((fileWithMeta) => ({
      image_url: URL.createObjectURL(fileWithMeta.file), // ✅ 미리보기 URL 생성
    }));

    setPhotoList((prevPhotos) => [...prevPhotos, ...newPhotos]);
    allFiles.forEach((f) => f.remove()); // 파일 리스트에서 제거
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
        <TextField
          label={translations.phototable.title}
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
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
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              image={formData.cover_image_url}
            />
          ) : (
            <label htmlFor="thumbnail-upload">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="thumbnail-upload"
                onChange={handleThumbnailChange}
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
          label={translations.phototable.artist}
          value={
            artistData.find((a) => a.id === formData.artist_id)?.name ||
            "**MissingArtist**"
          }
          fullWidth
        />
        <TextField
          label={translations.phototable.description}
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label={translations.phototable.price}
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label={translations.phototable.created_at}
          name="created_at"
          value={formData.created_at}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label={translations.phototable.updated_at}
          name="updated_at"
          value={formData.updated_at}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        {translations.phototable.photo}
      </Typography>

      <Grid container spacing={2}>
        {photoList.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card>
              <CardMedia component="img" height="180" image={item.image_url} />
              <CardContent>
                <Typography variant="body2" align="center">
                  {index + 1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*"
        maxFiles={30}
        autoUpload={false}
        inputContent={translations.phototable.add}
        styles={{
          dropzone: {
            border: "2px dashed gray",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary">
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
