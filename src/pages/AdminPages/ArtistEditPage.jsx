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
import { LanguageContext } from "../../contexts/LanguageContext";

const sampleData = {
  id: "4",
  name: "아이브",
  description:
    "스타쉽 엔터테인먼트 소속의 6인조 걸그룹으로, 2021년에 데뷔했다.",
  created_at: "2024-02-21",
  updated_at: "2024-02-21",
};

const samplePhotoBooks = [
  {
    title: "첫 번째 사진집",
    cover_image_url:
      "https://img.mbn.co.kr/filewww/news/other/2022/12/20/210120000133.jpg",
  },
  {
    title: "두 번째 사진집",
    cover_image_url:
      "https://www.behindpress.com/news/photo/202201/14825_26520_4935.jpg",
  },
  {
    title: "세 번째 사진집",
    cover_image_url:
      "https://img.mbn.co.kr/filewww/news/other/2022/12/20/210120000133.jpg",
  },
  {
    title: "네 번째 사진집",
    cover_image_url:
      "https://www.behindpress.com/news/photo/202201/14825_26520_4935.jpg",
  },
];

const DataEditor = () => {
  const [formData, setFormData] = useState(sampleData);
  const { translations } = useContext(LanguageContext);
  const [photoBooks] = useState(samplePhotoBooks);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          {translations.artisttable.page}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <TextField
          label={translations.artisttable.name}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label={translations.artisttable.description}
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label={translations.artisttable.created_at}
          name="created_at"
          value={formData.created_at}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label={translations.artisttable.updated_at}
          name="updated_at"
          value={formData.updated_at}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        {translations.artisttable.photo}
      </Typography>
      <Grid container spacing={2}>
        {photoBooks.map((book, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={book.cover_image_url}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="body1" align="center">
                  {book.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary">
        {translations.artisttable.edit}
        </Button>
        <Button variant="outlined" color="secondary">
        {translations.artisttable.cancel}
        </Button>
      </Box>
    </Container>
  );
};

export default DataEditor;
