import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  InputBase,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../components/Loading";
import dataList from "../data/List";
import MovieDetail from "../components/MovieDetail";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const keyword = searchTerm.trim();
      if (!keyword) return;

      setIsLoading(true);
      setFilteredData([]);
      setHasSearched(true);

      navigate(`/search?q=${keyword}`);

      setTimeout(() => {
        const result = dataList.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(result);
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    if (query) {
      setSearchTerm(query);
      setIsLoading(true);

      setTimeout(() => {
        const result = dataList.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(result);
        setIsLoading(false);
      }, 1000);
    }
  }, [location.search]);

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 110px)",
      }}
    >
      {/* 검색창 */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "10px 15px",
          mb: 3,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SearchIcon sx={{ color: "#555", mr: 1 }} />
        <InputBase
          placeholder="Search for an artist…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          sx={{
            flex: 1,
            color: "#000",
            fontSize: "1rem",
            "&::placeholder": { color: "#666" },
          }}
        />
      </Paper>

      {hasSearched && (
        <>
          {/* 검색 결과 */}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Loading />
            </Box>
          ) : filteredData.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#555" }}
            >
              検索結果がありません。
            </Typography>
          ) : (
            <Box sx={{ overflowX: "auto", overflowY: "hidden" }}>
              <ImageList
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  cursor: "grab",
                  "&:active": { cursor: "grabbing" },
                  "::-webkit-scrollbar": { display: "none" },
                  userSelect: "none",
                }}
                ref={rowRef}
              >
                {filteredData.map((item) => (
                  <ImageListItem
                    key={item.id}
                    onClick={() => setSelectedMovie(item)}
                    sx={{
                      flex: "0 0 auto",
                      width: { xs: "45%", sm: "30%", md: "20%", lg: "15%" },
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "10px",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.mainImg[0]}
                      alt={item.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                        filter: "brightness(1)",
                        transition: "filter 0.3s",
                        "&:hover": { filter: "brightness(0.85)" },
                      }}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <ImageListItemBar
                      title={item.title}
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        borderRadius: "10px",
                        textAlign: "left",
                        padding: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}

          {/* MovieDetail 모달 */}
          {selectedMovie && (
            <MovieDetail
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default SearchPage;
