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

const SearchPaymentsArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
    startDate: "",
    endDate: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newValue) => {
    const formatted = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      startDate: formatted,
      endDate:
        prev.endDate && dayjs(prev.endDate).isBefore(dayjs(formatted))
          ? formatted
          : prev.endDate,
    }));
  };

  const handleEndDateChange = (newValue) => {
    const formatted = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      endDate: formatted,
      startDate:
        prev.startDate && dayjs(prev.startDate).isAfter(dayjs(formatted))
          ? formatted
          : prev.startDate,
    }));
  };

  const handleSearch = () => {
    const params = { ...searchParams };

    if (params.startDate)
      params.startDate = dayjs(params.startDate)
        .utc()
        .startOf("day")
        .format("YYYY-MM-DD");

    if (params.endDate)
      params.endDate = dayjs(params.endDate)
        .utc()
        .endOf("day")
        .format("YYYY-MM-DD");

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
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <TextField
            label={translations.usereditpage.last_name}
            name="lastName"
            value={searchParams.lastName}
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
            label={translations.usereditpage.email}
            name="email"
            value={searchParams.email}
            onChange={handleChange}
            size="small"
          />
          <Select
            name="userType"
            value={searchParams.userType}
            onChange={handleChange}
            size="small"
            displayEmpty
          >
            <MenuItem value="">{translations.paymentTable.usertype}</MenuItem>
            <MenuItem value="super_admin">Super Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <DatePicker
            slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
            format="YYYY-MM-DD"
            value={
              searchParams.startDate ? dayjs(searchParams.startDate) : null
            }
            onChange={handleStartDateChange}
            maxDate={searchParams.endDate ? dayjs(searchParams.endDate) : null}
          />
          <span>~</span>
          <DatePicker
            slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
            format="YYYY-MM-DD"
            value={searchParams.endDate ? dayjs(searchParams.endDate) : null}
            onChange={handleEndDateChange}
            minDate={
              searchParams.startDate ? dayjs(searchParams.startDate) : null
            }
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
          {translations.managetable.search}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchPaymentsArea;
