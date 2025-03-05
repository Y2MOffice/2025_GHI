import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";

const UserEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `https://stage-api.glowsnaps.tokyo/api/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      alert(translations.usereditpage.savesuccess);
      navigate("/admin/manage");
    } catch (error) {
      alert(`${translations.usereditpage.savefail} ${error.message}`);
    }
  };

  if (loading) return <p>Now loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No Data</p>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5, p: 3, borderRadius: 2, bgcolor: grey[100] }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {translations.usereditpage.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth name="firstName" label="First Name" value={user.firstName} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="lastName" label="Last Name" value={user.lastName} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="nickname" label="Nickname" value={user.nickname} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="email" label="Email" value={user.email} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="phoneNumber" label="Phone Number" value={user.phoneNumber} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Select fullWidth name="displayLanguage" value={user.displayLanguage} onChange={handleChange}>
              <MenuItem value="ko">한국어</MenuItem>
              <MenuItem value="jp">日本語</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          <Button variant="contained" sx={{ bgcolor: grey[300], color: "black" }} onClick={() => navigate("/admin/manage")}>
            {translations.usereditpage.cancel}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {translations.usereditpage.save}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserEditPage;
