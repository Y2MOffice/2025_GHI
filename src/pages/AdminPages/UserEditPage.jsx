import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const UserEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // 🚀 초깃값 false
  const [switchState, setSwitchState] = useState(false); // 🚀 초깃값 false
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const data = await apiRequest(`/users/${id}`);

            setUser(data.data);
            setIsAdmin(data.isAdmin ?? false); // 🚀 undefined 방지
            setSwitchState(data.isAdmin ?? false); // 🚀 undefined 방지
        } catch (error) {
            alert("Missing User");
        }
    };

    if (id) {
        fetchUserData();
    }
}, [id]);


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
            await apiRequest(`/admins/promote/${id}`, "POST");
            alert("Admin Setting Success");
        } else {
            // 관리자 권한 삭제 (DELETE 요청)
            if (!window.confirm("Delete Admin authority?")) return;

            await apiRequest(`/admins/${id}`, "DELETE");
            alert("Delete Success");
        }

        navigate("/admin/users");
    } catch (error) {
        alert(switchState ? "관리자 권한 부여에 실패했습니다." : "Delete Fail");
    }
};


  // 취소 버튼 클릭 시 이동
  const handleCancel = () => {
    navigate("/admin/users");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          borderRadius: 2,
          bgcolor: "#f5f5f5",
        }}
      >
        {user && (
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 2 }}
          >
            현재 수정 중인 유저<br /> {user.name}
          </Typography>
        )}
        <FormControlLabel
          control={<Switch checked={switchState} onChange={handleToggle} />}
          label={"관리자 권한 부여"}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            {translations.admineditpage.save}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            {translations.admineditpage.cancel}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserEditPage;
