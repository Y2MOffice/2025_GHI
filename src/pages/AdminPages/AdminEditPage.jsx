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
import { apiRequest } from "../../utils/api";

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
        const response = await apiRequest(`/admins/${id}`);

        setAdmin(response.data);
        setOriginalRole(response.data.userType);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]);

  const handleRoleChange = async () => {
    const newRole = admin.userType === "super_admin" ? "super_admin" : "admin";

    try {
      const data = await apiRequest(`/admins/${id}/role`, "PATCH", { role: newRole });

      if (data.resultCode === 0) {
        alert(translations.admineditpage.changelog);
        setAdmin((prevAdmin) => ({ ...prevAdmin, userType: newRole }));
        navigate("/admin/manage");
      } else {
        alert(`Edit Fail: ${data.errorMessage || "unknownError"}`);
      }
    } catch (error) {
      alert(`${translations.admineditpage.changefail} ${error.message}`);
    }
  };

  const handleDeleteAdmin = async () => {
    if (!window.confirm(translations.admineditpage.question)) return;

    try {
        await apiRequest(`/admins/${id}`, "DELETE");

        alert(translations.admineditpage.deletelog);
        navigate("/admin/manage");
    } catch (error) {
        alert(translations.admineditpage.deletefail);
    }
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
        {admin && (
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 2 }}
          >
            현재 수정 중인 유저
            <br /> {admin.name}
          </Typography>
        )}
        <Grid container spacing={2}>
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
