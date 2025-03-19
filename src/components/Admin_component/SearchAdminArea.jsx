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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

dayjs.extend(utc);

const SearchAdminArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [searchParams, setSearchParams] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
    isDeleted: "",
    startDate: "",
    endDate: "",
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
          p: 1,
          border: "1px solid #ccc",
          borderRadius: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 0 }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            {translations.adminpage.searchCondition}
          </Typography>
          <IconButton onClick={handleClick}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <Collapse in={open}>
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
            <Select
              label={translations.usertable.usertype2}
              name="isDeleted"
              value={searchParams.isDeleted}
              onChange={handleChange}
              size="small"
              displayEmpty
            >
              <MenuItem value="">{translations.usertable.usertype2}</MenuItem>
              <MenuItem value="true">Inactive</MenuItem>
              <MenuItem value="false">Active</MenuItem>
            </Select>
            <Select
              label={translations.usertable.userType}
              name="userType"
              value={searchParams.userType}
              onChange={handleChange}
              size="small"
              displayEmpty
            >
              <MenuItem value="">{translations.usertable.usertype}</MenuItem>
              <MenuItem value="super_admin">super_admin</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
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
            <></>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              검색
            </Button>
          </Collapse>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchAdminArea;
