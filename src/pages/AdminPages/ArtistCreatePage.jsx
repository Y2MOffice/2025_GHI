import React, { useState, useContext } from "react";
import { TextField, Container, Box, Button, Typography } from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const ArtistCreatePage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHashtagChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = async () => {
    try {
      await apiRequest(`/artists`, "POST", {
        name: formData.name,
        description: formData.description,
        hashtags: formData.hashtags,
      });

      alert("Create Success");
      navigate("/admin/artists");
    } catch (error) {
      alert("Create Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 2,
          border: "2px solid #ccc",
          borderRadius: 3,
          bgcolor: "#f9f9f9",
          mt: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, mt: 4 }}>
          {translations.artisttable.create_title}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TextField
            label={translations.artisttable.name}
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label={translations.artisttable.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={20}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label={translations.artisttable.hashtag}
            name="hashtags"
            value={formData.hashtags.join(", ")}
            onChange={handleHashtagChange}
            fullWidth
            placeholder={translations.artisttable.placeholder}
          />
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {translations.artisttable.create}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/admin/artists")}
          >
            {translations.artisttable.cancel}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ArtistCreatePage;
