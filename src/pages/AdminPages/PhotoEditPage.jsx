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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LanguageContext } from "../../contexts/LanguageContext";

// 사진집 데이터
const photoData = {
  id: "0",
  artist_id: "0",
  title: "TWICE 1st Photobook: ONE IN A MILLION",
  description: "트와이스의 첫 번째 공식 사진집, 멤버들의 다양한 매력을 담았다.",
  cover_image_url:
    "https://i.ebayimg.com/images/g/S~wAAOSwdPxgHWlY/s-l1200.jpg",
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

  const [photoList, setPhotoList] = useState([
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
    { image_url: "https://pbs.twimg.com/media/DD5ji7jUIAAgCxN.jpg:large" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newPhoto = {
        image_url: URL.createObjectURL(file),
      };
      //선택한 파일을 FormData를 이용해 서버로 전송.
      //업로드 성공 시 서버에서 받은 URL을 setPhotoList([...photoList, { image_url: 서버URL }]) 형태로 저장.
      setPhotoList([...photoList, newPhoto]);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <TextField
          label={translations.phototable.title}
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <Card sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            height="auto"
            sx={{ maxWidth: "100%", objectFit: "contain" }}
            image={formData.cover_image_url}
          />
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

        <Grid item xs={6} sm={4} md={3}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "180px",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-photo"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-photo">
              <IconButton color="primary" component="span">
                <AddIcon sx={{ fontSize: 48 }} />
              </IconButton>
            </label>
          </Card>
          <CardContent>
            <Typography variant="body2" align="center">
            {translations.phototable.add}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

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
