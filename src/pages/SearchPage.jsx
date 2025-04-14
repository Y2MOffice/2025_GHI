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
  const [artistResults, setArtistResults] = useState([]);
  const [collectionResults, setCollectionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { translations } = useContext(LanguageContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSearchResults = async (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setArtistResults([]);
    setCollectionResults([]);

    try {
      const [artistRes, collectionRes] = await Promise.all([
        apiRequest(`/artists/search?tag=${encodeURIComponent(keyword)}`),
        apiRequest(
          `/photo-collections/search?tag=${encodeURIComponent(keyword)}`
        ),
      ]);

      if (artistRes.resultCode === 0) {
        setArtistResults(artistRes.data);
      }

      if (collectionRes.resultCode === 0) {
        setCollectionResults(collectionRes.data);
      }
    } catch (error) {
      console.error("검색 오류:", error.message);
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

  const renderImageList = (items, isArtist = true) =>
    items.length > 0 && (
      <Box sx={{ overflowX: "auto", mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          {isArtist
            ? translations.searchpage.artist
            : translations.searchpage.collection}
        </Typography>
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
          {items.map((item) => (
            <ImageListItem
              key={item.id}
              sx={{
                flex: "0 0 auto",
                width: { xs: "80%", sm: "45%", md: "30%", lg: "20%" },
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "background.paper",
                padding: "10px",
                boxShadow: 2,
              }}
            >
              {!isArtist && item.coverImageUrl && (
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                />
              )}
              <Box sx={{ fontWeight: "bold" }}>
                {isArtist ? item.name : item.title}
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );

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
          placeholder="Search for an artist or collection…"
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
      ) : hasSearched ? (
        artistResults.length === 0 && collectionResults.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            {translations.searchpage.none}
          </Typography>
        ) : (
          <>
            {renderImageList(artistResults, true)}
            {renderImageList(collectionResults, false)}
          </>
        )
      ) : null}
    </Box>
  );
};

export default SearchPage;
