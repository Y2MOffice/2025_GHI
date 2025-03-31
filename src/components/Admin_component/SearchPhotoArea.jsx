import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputBase,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LanguageContext } from "../../contexts/LanguageContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const SearchPhotoArea = ({ onSearch }) => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    Title: "",
    StartDate: null,
    EndDate: null,
    Hashtags: "",
    ArtistName: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {
      Title: searchParams.Title,
      ...(searchParams.StartDate && {
        StartDate: dayjs(searchParams.StartDate).format("YYYY-MM-DD"),
      }),
      ...(searchParams.EndDate && {
        EndDate: dayjs(searchParams.EndDate).format("YYYY-MM-DD"),
      }),
      Hashtags: searchParams.Hashtags,
      ArtistName: searchParams.ArtistName,
      Page: 1,
      PageSize: 10,
    };
    onSearch(params);
  };

  const handleReset = () => {
    setSearchParams({
      Title: "",
      StartDate: null,
      EndDate: null,
      Hashtags: "",
      ArtistName: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const [open, setOpen] = useState(true);
  const handleClick = () => setOpen(!open);

  return (
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
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* 날짜 선택 */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "center",
                minWidth: "250px",
              }}
            >
              <DatePicker
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { minWidth: "120px", flex: "1 1 auto" },
                  },
                }}
                format="YYYY-MM-DD"
                value={searchParams.StartDate}
                onChange={(newValue) => handleDateChange("StartDate", newValue)}
                maxDate={searchParams.EndDate}
                label="Start Date"
              />
              <Typography sx={{ mx: 1 }}>~</Typography>
              <DatePicker
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { minWidth: "120px", flex: "1 1 auto" },
                  },
                }}
                format="YYYY-MM-DD"
                value={searchParams.EndDate}
                onChange={(newValue) => handleDateChange("EndDate", newValue)}
                minDate={searchParams.StartDate}
                label="End Date"
              />
            </Box>
          </LocalizationProvider>

          {/* 검색 필드 */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flex: "1 1 auto",
              minWidth: "200px",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flex: "1 1 150px",
              }}
              onSubmit={handleSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={translations.phototable.title}
                name="Title"
                value={searchParams.Title}
                onChange={handleInputChange}
              />
            </Paper>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flex: "1 1 150px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={translations.phototable.artist}
                name="ArtistName"
                value={searchParams.ArtistName}
                onChange={handleInputChange}
              />
            </Paper>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flex: "1 1 150px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Hashtags"
                name="Hashtags"
                value={searchParams.Hashtags}
                onChange={handleInputChange}
              />
            </Paper>
          </Box>

          {/* 버튼 */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              minWidth: "150px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleSearch}
                sx={{ flex: "1 1 100px" }}
              >
                {translations.phototable.search}
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ flex: "1 1 100px" }}
              >
                {translations.phototable.reset}
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchPhotoArea;
