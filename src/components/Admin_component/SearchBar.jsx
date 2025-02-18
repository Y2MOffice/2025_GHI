import {
  InputBase,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const SearchBar = () => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 기존 검색어 가져오기
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // 검색 실행 시 URL 변경 (검색하면 page=1로 초기화)
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?query=${searchQuery}`);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={translations.managetable.search_result}
          inputProps={{ "aria-label": translations.managetable.search_result }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Paper>
      <ThemeProvider theme={theme}>
        <Button variant="contained" disableElevation onClick={handleSearch}>
        {translations.managetable.search}
        </Button>
      </ThemeProvider>
    </Box>
  );
};

export default SearchBar;
