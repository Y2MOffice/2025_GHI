import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Container,
  Box,
  Button,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";

const ArtistEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
  
    fetch(`https://stage-api.glowsnaps.tokyo/api/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.data.name,
          description: data.data.description,
          hashtags: Array.isArray(data.data.hashtags) ? data.data.hashtags : [],
          startDate: data.data.createdAt,
        });
        setLoading(false);
        console.log(data)
      })
      .catch(() => {
        alert("Loading Failed");
        setLoading(false);
      });
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
      hashtags: e.target.value ? e.target.value.split(",").map((tag) => tag.trim()) : [],
    }));
  };

  const handleSubmit = () => {
    const token = sessionStorage.getItem("token");
  
    fetch(`https://stage-api.glowsnaps.tokyo/api/artists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData?.name || "",
        description: formData?.description || "",
        hashtags: formData?.hashtags || [],
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Edit Failed");
        return res.json();
      })
      .then(() => {
        alert("Edit Success");
        navigate("/admin/artists");
      })
      .catch(() => alert("Edit Failed"));
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <TextField
              label={translations.artisttable.name}
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label={translations.artisttable.description}
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
              multiline
              rows={20}
              fullWidth
            />
            <TextField
              label={translations.artisttable.hashtag}
              name="hashtags"
              value={formData?.hashtags.length > 0 ? formData.hashtags.join(", ") : ""}
              onChange={handleHashtagChange}
              fullWidth
              placeholder={translations.artisttable.placeholder}
            />
            <TextField
              label={translations.artisttable.startDate}
              name="startDate"
              value={formData?.startDate || ""}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </>
        )}
      </Box>

      {!loading && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {translations.artisttable.edit}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/admin/artistmanage")}>
            {translations.artisttable.cancel}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ArtistEditPage;
