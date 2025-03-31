import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  useMediaQuery,
  Select,
  MenuItem,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LanguageContext } from "../../contexts/LanguageContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SearchBannerArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    title: "",
    photoCollectionTitle: "",
    isDeleted: "",
    isActive: "",
    displayStartDate: "",
    displayEndDate: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen(!open);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      displayStartDate: formattedDate,
      displayEndDate:
        prev.displayEndDate &&
        dayjs(prev.displayEndDate).isBefore(dayjs(formattedDate))
          ? formattedDate
          : prev.displayEndDate,
    }));
  };

  const handleEndDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      displayEndDate: formattedDate,
      displayStartDate:
        prev.displayStartDate &&
        dayjs(prev.displayStartDate).isAfter(dayjs(formattedDate))
          ? formattedDate
          : prev.displayStartDate,
    }));
  };

  const handleSearch = () => {
    const params = { ...searchParams };

    if (params.displayStartDate) {
      params.displayStartDate = dayjs(params.displayStartDate)
        .utc()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
    }

    if (params.displayEndDate) {
      params.displayEndDate = dayjs(params.displayEndDate)
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
        {/* 제목 + 토글 아이콘 */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {translations.adminpage.searchCondition}
          </Typography>
          <IconButton onClick={handleToggle}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={open}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              label={translations.bannertable.title}
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              size="small"
            />
            <TextField
              label={translations.bannertable.photoCollectionTitle}
              name="photoCollectionTitle"
              value={searchParams.photoCollectionTitle}
              onChange={handleChange}
              size="small"
            />
            <Select
              label={translations.bannertable.state}
              name="isDeleted"
              value={searchParams.isDeleted}
              onChange={handleChange}
              size="small"
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">{translations.bannertable.state}</MenuItem>
              <MenuItem value="true">Inactive</MenuItem>
              <MenuItem value="false">Active</MenuItem>
            </Select>
            <Select
              label={translations.bannertable.isActive}
              name="isActive"
              value={searchParams.isActive}
              onChange={handleChange}
              size="small"
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">{translations.bannertable.isActive}</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </Box>

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
                searchParams.displayStartDate
                  ? dayjs(searchParams.displayStartDate)
                  : null
              }
              onChange={handleStartDateChange}
              maxDate={
                searchParams.displayEndDate
                  ? dayjs(searchParams.displayEndDate)
                  : null
              }
            />
            <span>~</span>
            <DatePicker
              slotProps={{
                textField: { size: "small", sx: { width: "150px" } },
              }}
              format="YYYY-MM-DD"
              value={
                searchParams.displayEndDate
                  ? dayjs(searchParams.displayEndDate)
                  : null
              }
              onChange={handleEndDateChange}
              minDate={
                searchParams.displayStartDate
                  ? dayjs(searchParams.displayStartDate)
                  : null
              }
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              검색
            </Button>
          </Box>
        </Collapse>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchBannerArea;
