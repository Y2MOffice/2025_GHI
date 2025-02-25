import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AdminRegisterPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // 비밀번호 확인 체크
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(password !== e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          borderRadius: 2,
          bgcolor: grey[100],
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {translations.registeradmin.title}
        </Typography>
        <Grid container spacing={2}>
          {/* 이름 & 성 (2열) */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={translations.registeradmin.first_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={translations.registeradmin.last_name}
              variant="outlined"
            />
          </Grid>

          {/* 한 줄 입력 필드 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.registeradmin.nickname}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.registeradmin.email}
              variant="outlined"
            />
          </Grid>

          {/* 비밀번호 & 비밀번호 확인 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.registeradmin.password}
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.registeradmin.confirm_password}
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              error={passwordError}
              helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translations.registeradmin.phone_number}
              variant="outlined"
            />
          </Grid>

          {/* 사용자 유형 선택 */}
          <Grid item xs={12}>
            <Select fullWidth variant="outlined" defaultValue="">
              <MenuItem value="">
                {translations.registeradmin.user_type}
              </MenuItem>
              <MenuItem value="admin">
                {translations.registeradmin.user_type_options.admin}
              </MenuItem>
              <MenuItem value="superadmin">
                {translations.registeradmin.user_type_options.superadmin}
              </MenuItem>
            </Select>
          </Grid>
        </Grid>

        {/* 버튼 영역 */}
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
            {translations.registeradmin.cancel}
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: pink[500],
              color: "white",
              "&:hover": { bgcolor: pink[700] },
            }}
            disabled={passwordError || !password || !confirmPassword} // 비밀번호 확인 오류 시 버튼 비활성화
          >
            {translations.registeradmin.save}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminRegisterPage;
