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

const SearchArtistArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    name: "",
    hashtag: "",
    startDate: "",
    endDate: "",
    isDeleted: "",
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
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }

    if (params.endDate) {
      params.endDate = dayjs(params.endDate)
        .utc()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
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
          width: "100%",
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
            alignItems: "center",
          }}
        >
          <TextField
            label={translations.artisttable.name}
            name="name"
            value={searchParams.name}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label={translations.artisttable.hashtag}
            name="hashtag"
            value={searchParams.hashtag}
            onChange={handleChange}
            size="small"
          />
          <Select
            name="isDeleted"
            value={searchParams.isDeleted}
            onChange={handleChange}
            size="small"
            displayEmpty
          >
            <MenuItem value="">{translations.managetable.state}</MenuItem>
            <MenuItem value="true">Inactive</MenuItem>
            <MenuItem value="false">Active</MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              mt: 1,
              width: "100%",
            }}
          >
            <DatePicker
              slotProps={{
                textField: { size: "small", sx: { width: "150px" } },
              }}
              format="YYYY-MM-DD"
              value={
                searchParams.startDate ? dayjs(searchParams.startDate) : null
              }
              onChange={handleStartDateChange}
              maxDate={
                searchParams.endDate ? dayjs(searchParams.endDate) : null
              } // 🔹 종료 날짜 이후 선택 방지
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
              {translations.artisttable.search}
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchArtistArea;
