import React, { useContext } from "react";
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
import { pink, grey } from "@mui/material/colors";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Navigate, useNavigate } from "react-router-dom";

const AdminEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
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
              label={translations.admineditpage.first_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={translations.admineditpage.last_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.admineditpage.nickname}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.admineditpage.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.admineditpage.phone_number}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined" defaultValue="">
              <MenuItem value="">
                {translations.admineditpage.user_type}
              </MenuItem>
              <MenuItem value="user">
                {translations.admineditpage.user_type_options.admin}
              </MenuItem>
              <MenuItem value="admin">
                {translations.admineditpage.user_type_options.superadmin}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined" defaultValue="">
              <MenuItem value="">{translations.admineditpage.status}</MenuItem>
              <MenuItem value="active">
                {translations.admineditpage.status_options.active}
              </MenuItem>
              <MenuItem value="inactive">
                {translations.admineditpage.status_options.inactive}
              </MenuItem>
            </Select>
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
            {translations.usereditpage.cancel}
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: pink[500],
              color: "white",
              "&:hover": { bgcolor: pink[700] },
            }}
          >
            {translations.usereditpage.save}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminEditPage;
