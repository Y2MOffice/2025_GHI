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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LanguageContext } from "../../contexts/LanguageContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SearchPurchaseArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    title: "",
    email: "",
    lastName: "",
    firstName: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newValue) => {
    setSearchParams((prev) => {
      const formattedDate = newValue
        ? dayjs(newValue).format("YYYY-MM-DD")
        : "";
      return {
        ...prev,
        startDate: formattedDate,
        endDate:
          prev.endDate && dayjs(prev.endDate).isBefore(dayjs(formattedDate))
            ? formattedDate
            : prev.endDate,
      };
    });
  };

  const handleEndDateChange = (newValue) => {
    setSearchParams((prev) => {
      const formattedDate = newValue
        ? dayjs(newValue).format("YYYY-MM-DD")
        : "";
      return {
        ...prev,
        endDate: formattedDate,
        startDate:
          prev.startDate && dayjs(prev.startDate).isAfter(dayjs(formattedDate))
            ? formattedDate
            : prev.startDate,
      };
    });
  };

  const handleSearch = () => {
    const params = { ...searchParams };

    if (params.startDate) {
      params.startDate = dayjs(params.startDate)
        .utc()
        .startOf("day")
        .format("YYYY-MM-DD");
    }

    if (params.endDate) {
      params.endDate = dayjs(params.endDate)
        .utc()
        .endOf("day")
        .format("YYYY-MM-DD");
    }

    onSearch(params);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            label={translations.purchasetable.title}
            name="title"
            value={searchParams.title}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label={translations.supage.mail}
            name="email"
            value={searchParams.email}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label={translations.supage.name1}
            name="firstName"
            value={searchParams.firstName}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label={translations.supage.name2}
            name="lastName"
            value={searchParams.lastName}
            onChange={handleChange}
            size="small"
          />
          <DatePicker
            slotProps={{
              textField: { size: "small", sx: { width: "150px" } },
            }}
            format="YYYY-MM-DD"
            value={
              searchParams.startDate ? dayjs(searchParams.startDate) : null
            }
            onChange={handleStartDateChange}
            maxDate={searchParams.endDate ? dayjs(searchParams.endDate) : null} // 🔹 종료 날짜 이후 선택 방지
          />
          <span>~</span>
          <DatePicker
            slotProps={{
              textField: { size: "small", sx: { width: "150px" } },
            }}
            format="YYYY-MM-DD"
            value={searchParams.endDate ? dayjs(searchParams.endDate) : null}
            onChange={handleEndDateChange}
            minDate={
              searchParams.startDate ? dayjs(searchParams.startDate) : null
            }
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            검색
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchPurchaseArea;
