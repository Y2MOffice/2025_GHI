import React, { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  InputBase,
  ImageList,
  ImageListItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../components/Loading";
import { apiRequest } from "../utils/api";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { translations } = useContext(LanguageContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSearchResults = async (keyword) => {
    setIsLoading(true);
    setFilteredData([]);
    setHasSearched(true);

    try {
      const result = await apiRequest(
        `/artists/search?tag=${encodeURIComponent(keyword)}`
      );
      if (result.resultCode === 0) {
        setFilteredData(result.data);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error("검색 오류:", error.message);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const keyword = searchTerm.trim();
      if (!keyword) return;

      navigate(`/search?q=${keyword}`);
      await fetchSearchResults(keyword);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    if (query) {
      setSearchTerm(query);
      fetchSearchResults(query);
    }
  }, [location.search]);

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: "1200px",
        margin: "auto",
        minHeight: "calc(100vh - 110px)",
      }}
    >
      {/* 검색창 */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          padding: "10px 15px",
          mb: 3,
        }}
      >
        <SearchIcon sx={{ mr: 1 }} />
        <InputBase
          placeholder="Search for an artist…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          sx={{
            flex: 1,
            fontSize: "1rem",
          }}
        />
      </Paper>

      {/* 검색 결과 */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Loading />
        </Box>
      ) : filteredData.length === 0 && hasSearched ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {translations.searchpage.none}
        </Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <ImageList
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              p: 2,
              cursor: "grab",
              "&:active": { cursor: "grabbing" },
              "::-webkit-scrollbar": { display: "none" },
            }}
            ref={rowRef}
          >
            {filteredData.map((artist) => (
              <ImageListItem
                key={artist.id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "45%", sm: "30%", md: "20%", lg: "15%" },
                  textAlign: "center",
                  borderRadius: "10px",
                  backgroundColor: "background.paper",
                  padding: "10px",
                  boxShadow: 2,
                }}
              >
                <Box sx={{ fontWeight: "bold" }}>{artist.name}</Box>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
