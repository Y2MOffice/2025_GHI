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
  FormControlLabel,
  Switch,
} from "@mui/material";
import { pink, grey } from "@mui/material/colors";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalRole, setOriginalRole] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `https://stage-api.glowsnaps.tokyo/api/admins/${id}`,
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
        setAdmin(data.data);
        setOriginalRole(data.data.userType);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]);

  const handleRoleChange = async () => {
    const token = sessionStorage.getItem("token");
    const newRole = admin.userType === "super_admin" ? "super_admin" : "admin";

    try {
      const response = await fetch(
        `https://stage-api.glowsnaps.tokyo/api/admins/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      if (data.resultCode === 0) {
        alert(translations.admineditpage.changelog);
        setAdmin((prevAdmin) => ({ ...prevAdmin, userType: newRole }));
      } else {
        alert(`변경 실패: ${data.errorMessage || "unknownError"}`);
      }
    } catch (error) {
      alert(`${translations.admineditpage.changefail} ${error.message}`);
    }
  };

  const handleDeleteAdmin = () => {
    if (!window.confirm(translations.admineditpage.question)) return; // ✅ 삭제 확인 알람

    const token = sessionStorage.getItem("token");

    fetch(`https://stage-api.glowsnaps.tokyo/api/admins/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("삭제 실패");
        }
        return response.json();
      })
      .then(() => {
        alert(translations.admineditpage.deletelog);
        navigate("/admin/manage");
      })
      .catch((error) => {
        alert(translations.admineditpage.deletefail);
      });
  };

  if (loading) return <p>Now loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!admin) return <p>No Data</p>;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          borderRadius: 2,
          bgcolor: grey[100],
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {translations.admineditpage.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={admin.firstName}
              label={translations.admineditpage.first_name}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={admin.lastName}
              label={translations.admineditpage.last_name}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={admin.nickname}
              label={translations.admineditpage.nickname}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={admin.email}
              label={translations.admineditpage.email}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={admin.phoneNumber}
              label={translations.admineditpage.phone_number}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label={translations.admineditpage.status}
              value={
                admin.isDeleted
                  ? translations.admineditpage.status_options.inactive
                  : translations.admineditpage.status_options.active
              }
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label={translations.admineditpage.language}
              value={
                admin.displayLanguage === "ko"
                  ? "한국어"
                  : admin.displayLanguage === "jp"
                  ? "日本語"
                  : "English"
              }
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={admin.userType === "super_admin"}
                  onChange={(e) =>
                    setAdmin({
                      ...admin,
                      userType: e.target.checked ? "super_admin" : "admin",
                    })
                  }
                />
              }
              label={translations.admineditpage.user_type_options.superadmin}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: grey[300],
              color: "black",
              "&:hover": { bgcolor: grey[400] },
            }}
            onClick={() => navigate("/admin/manage")}
          >
            {translations.admineditpage.cancel}
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: pink[500],
              color: "white",
              "&:hover": { bgcolor: pink[700] },
            }}
            onClick={handleRoleChange}
            disabled={admin.userType === originalRole}
          >
            {translations.admineditpage.save}
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteAdmin}>
            {translations.admineditpage.delete}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminEditPage;
