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

const SearchSakuraArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useState({
    lastName: "",
    firstName: "",
    email: "",
    transactionType: "",
    isPaid: "",
    startDate: "",
    endDate: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(true);

  const handleClick = () => setOpen(!open);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      startDate: formattedDate,
      endDate:
        prev.endDate && dayjs(prev.endDate).isBefore(dayjs(formattedDate))
          ? formattedDate
          : prev.endDate,
    }));
  };

  const handleEndDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setSearchParams((prev) => ({
      ...prev,
      endDate: formattedDate,
      startDate:
        prev.startDate && dayjs(prev.startDate).isAfter(dayjs(formattedDate))
          ? formattedDate
          : prev.startDate,
    }));
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
          width: "100%",
        }}
      >
        {/* 헤더 + 접기/펼치기 아이콘 */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {translations.adminpage.searchCondition}
          </Typography>
          <IconButton onClick={handleClick}>
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
              label={translations.supage.name2}
              name="lastName"
              value={searchParams.lastName}
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
              label={translations.sakuratable.email}
              name="email"
              value={searchParams.email}
              onChange={handleChange}
              size="small"
            />
            <TextField
              label={translations.sakuratable.transaction_type}
              name="transactionType"
              value={searchParams.transactionType}
              onChange={handleChange}
              size="small"
            />
            <Select
              name="isPaid"
              value={searchParams.isPaid}
              onChange={handleChange}
              size="small"
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">{translations.sakuratable.is_paid}</MenuItem>
              <MenuItem value={true}>O</MenuItem>
              <MenuItem value={false}>X</MenuItem>
            </Select>

            {/* 날짜 범위 */}
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
                }
              />
              <span>~</span>
              <DatePicker
                slotProps={{
                  textField: { size: "small", sx: { width: "150px" } },
                }}
                format="YYYY-MM-DD"
                value={
                  searchParams.endDate ? dayjs(searchParams.endDate) : null
                }
                onChange={handleEndDateChange}
                minDate={
                  searchParams.startDate ? dayjs(searchParams.startDate) : null
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                {translations.managetable.search}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchSakuraArea;
