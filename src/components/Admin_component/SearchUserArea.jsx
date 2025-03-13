import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  useMediaQuery,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { LanguageContext } from "../../contexts/LanguageContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SearchUserArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nickname: "",
    isDeleted: "",
    startDate: "",
    endDate: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = { ...searchParams };

    if (params.startDate) {
      params.startDate = dayjs(params.startDate)
        .utc() // ✅ UTC 변환
        .startOf("day") // ✅ 하루의 시작 시간
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }

    if (params.endDate) {
      params.endDate = dayjs(params.endDate)
        .utc()
        .endOf("day") // ✅ 하루의 끝 시간
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }
    onSearch(params);
  };

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {translations.adminpage.searchCondition}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <TextField
          label={translations.usertable.email}
          name="email"
          value={searchParams.email}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label={translations.usereditpage.first_name}
          name="firstName"
          value={searchParams.firstName}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label={translations.usereditpage.last_name}
          name="lastName"
          value={searchParams.lastName}
          onChange={handleChange}
          size="small"
        />
        <Select
          label={translations.usertable.usertype}
          name="isDeleted"
          value={searchParams.isDeleted}
          onChange={handleChange}
          size="small"
          displayEmpty
        >
          <MenuItem value="">{translations.usertable.usertype}</MenuItem>
          <MenuItem value="true">Inactive</MenuItem>
          <MenuItem value="false">Active</MenuItem>
        </Select>
        <TextField
          label={translations.usertable.date}
          name="startDate"
          type="date"
          value={searchParams.startDate}
          onChange={handleChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        ~
        <TextField
          label={translations.usertable.date}
          name="endDate"
          type="date"
          value={searchParams.endDate}
          onChange={handleChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          검색
        </Button>
      </Box>
    </Box>
  );
};

export default SearchUserArea;
