import React, { useState, useContext } from "react";
import {
  TextField,
  Container,
  Box,
  Button,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    const token = sessionStorage.getItem("token");

    fetch("https://stage-api.glowsnaps.tokyo/api/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        hashtags: formData.hashtags,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create Failed");
        return res.json();
      })
      .then(() => {
        alert("Create Success");
        navigate("/admin/artistmanage");
      })
      .catch(() => alert("Create Failed"));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
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
          label={translations.artisttable.hashtag}
          name="hashtags"
          value={formData.hashtags.join(", ")}
          onChange={handleHashtagChange}
          fullWidth
          placeholder={translations.artisttable.placeholder}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {translations.artisttable.create}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/admin/artistmanage")}>
          {translations.artisttable.cancel}
        </Button>
      </Box>
    </Container>
  );
};

export default ArtistCreatePage;
