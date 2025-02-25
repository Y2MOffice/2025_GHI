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
import { useNavigate } from "react-router-dom";

//해야할것
// 상태 불러오기
//취소 눌렀을시 form에있는값 초기화하고 이전페이지로 돌아가기
//확인 눌렀을때 전송
const UserEditPage = () => {
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
          {translations.usereditpage.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={translations.usereditpage.first_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={translations.usereditpage.last_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.usereditpage.nickname}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.usereditpage.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.usereditpage.phone_number}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined" defaultValue="">
              <MenuItem value="">
                {translations.usereditpage.user_type}
              </MenuItem>
              <MenuItem value="user">
                {translations.usereditpage.user_type_options.user}
              </MenuItem>
              <MenuItem value="admin">
                {translations.usereditpage.user_type_options.admin}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined" defaultValue="">
              <MenuItem value="">{translations.usereditpage.status}</MenuItem>
              <MenuItem value="active">
                {translations.usereditpage.status_options.active}
              </MenuItem>
              <MenuItem value="inactive">
                {translations.usereditpage.status_options.inactive}
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
            onClick={() => navigate("/admin/users")}
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

export default UserEditPage;
