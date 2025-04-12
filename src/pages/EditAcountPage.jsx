import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { apiRequest } from "../utils/api";

const EditAccount = () => {
  const { translations, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    phoneNumber: "",
    password: "",
    displayLanguage: "",
    timezone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await apiRequest("/users/me");
      if (res?.resultCode === 0) {
        const nameSplit = res.data.name.split(" ");
        setForm({
          firstName: nameSplit[1] || "",
          lastName: nameSplit[0] || "",
          nickname: res.data.nickname || "",
          phoneNumber: res.data.phoneNumber || "",
          password: "",
          displayLanguage: res.data.displayLanguage || "jp",
        });
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const hasEmptyField = () => {
    const { firstName, lastName, nickname, phoneNumber, displayLanguage } =
      form;
    return (
      !firstName.trim() ||
      !lastName.trim() ||
      !nickname.trim() ||
      !phoneNumber.trim() ||
      !displayLanguage.trim()
    );
  };

  const handleSave = async () => {
    if (hasEmptyField()) {
      alert(translations.prpage.error1);
      return;
    }
    if (!form.password.trim()) {
      alert(translations.editacc.required);
      return;
    }
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dataToSend = { 
      ...form, 
      timezone: currentTimezone 
    };

    await apiRequest("/users/me", "PATCH", dataToSend);
    const user = JSON.parse(sessionStorage.getItem("user"));
    user.displayLanguage = form.displayLanguage;
    sessionStorage.setItem("user", JSON.stringify(user));

    // ✅ LanguageContext에도 반영
    setLanguage(form.displayLanguage);
    alert("Save!");
    navigate("/mypage");
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "rgb(250, 241, 242)",
        backgroundColor: "rgb(228, 216, 217)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: "600px" },
          backgroundColor: "#7d5959",
          borderRadius: 2,
          padding: { xs: 3, sm: 4 },
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}
        >
          {translations.editacc.name}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          name="firstName"
          label={translations.usereditpage.first_name} //이름칸
          value={form.firstName}
          onChange={handleChange}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="lastName"
          label={translations.usereditpage.last_name} //성칸
          value={form.lastName}
          onChange={handleChange}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="nickname"
          label={translations.usereditpage.nickname} //닉네임
          value={form.nickname}
          onChange={handleChange}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="phoneNumber"
          label={translations.editacc.phone}
          value={form.phoneNumber}
          onChange={handleChange}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          fullWidth
          type="password"
          variant="outlined"
          name="password"
          label={translations.editacc.password}
          value={form.password}
          onChange={handleChange}
          sx={{
            mb: { xs: 1.5, sm: 2 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(250, 241, 242)",
              },
            },
            input: { color: "rgb(250, 241, 242)" },
            label: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <FormControl
          fullWidth
          sx={{
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Select
            name="displayLanguage"
            value={form.displayLanguage}
            onChange={handleChange}
          >
            <MenuItem value="ko">한국어</MenuItem>
            <MenuItem value="jp">日本語</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          sx={{
            backgroundColor: "#f1d1d2",
            color: "#7d5959",
            "&:hover": {
              backgroundColor: "#faf1f2",
            },
          }}
        >
          {translations.editacc.save}
        </Button>
      </Box>
    </Box>
  );
};

export default EditAccount;
