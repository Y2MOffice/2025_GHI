import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  InputBase,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const SearchArea = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 검색 실행 시 URL 변경 (검색하면 page=1로 초기화)
  const handleSearch = (e) => {
    e.preventDefault();
    let queryParams = `?query=${searchQuery}`;
    if (startDate)
      queryParams += `&startDate=${dayjs(startDate).format("YYYY-MM-DD")}`;
    if (endDate)
      queryParams += `&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`;
    navigate(queryParams);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" gap={2} alignItems="center">
          <DatePicker
            slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
            format="YYYY-MM-DD"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            maxDate={endDate}
          />
          <span>~</span>
          <DatePicker
            slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
            format="YYYY-MM-DD"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
          />
        </Box>
      </LocalizationProvider>
      <Box display="flex" alignItems="center" gap={1}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={handleSearch}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="検索内容"
            inputProps={{ "aria-label": "検索内容" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>
        <ThemeProvider theme={theme}>
          <Button variant="contained" disableElevation onClick={handleSearch}>
            検索
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default SearchArea;
