import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const UserInfoTab = ({ userId }) => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // 🚀 초깃값 false
  const [switchState, setSwitchState] = useState(false); // 🚀 초깃값 false
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiRequest(`/users/${userId}`);

        setUser(data.data);
        setIsAdmin(data.isAdmin ?? false); // 🚀 undefined 방지
        setSwitchState(data.isAdmin ?? false); // 🚀 undefined 방지)
      } catch (error) {
        alert("Missing User");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleCancel = () => {
    navigate("/admin/users");
  };

  // 스위치 변경 이벤트
  const handleToggle = () => {
    setSwitchState((prev) => !prev);
  };

  // 확인 버튼 클릭 (API 호출)
  const handleConfirm = async () => {
    if (switchState === isAdmin) {
      alert("Not Changed State");
      return;
    }

    try {
      if (switchState) {
        // 관리자 권한 부여 (POST 요청)
        await apiRequest(`/admins/promote/${userId}`, "POST");
        alert("Admin Setting Success");
      } else {
        // 관리자 권한 삭제 (DELETE 요청)
        if (!window.confirm("Delete Admin authority?")) return;

        await apiRequest(`/admins/${userId}`, "DELETE");
        alert("Delete Success");
      }

      navigate("/admin/users");
    } catch (error) {
      alert(switchState ? "Add Fail" : "Delete Fail");
    }
  };

  if (loading) return <p>Now loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ p: 3, bgcolor: grey[100], borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {translations.userinfo.userinfo}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>ID:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.id}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.name}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.name}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>translations.userinfo.email:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.email}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.phone}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.phoneNumber}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.language}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.displayLanguage}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.nickname}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.nickname}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.usertype}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.userType}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.psakura}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.paidSakura}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.fsakura}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.freeSakura}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>{translations.userinfo.deleted}:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{user.isDeleted ? translations.userinfo.yes : translations.userinfo.no}</Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={<Switch checked={switchState} onChange={handleToggle} />}
          label={translations.userinfo.admin}
        />
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          {translations.admineditpage.save}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          {translations.admineditpage.cancel}
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfoTab;
