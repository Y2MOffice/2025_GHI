import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  InputBase,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../components/Loading";
import dataList from "../data/List";
import MovieDetail from "../components/MovieDetail"; // 추가

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // 추가

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const keyword = searchTerm.trim();
      if (!keyword) return;

      setIsLoading(true);
      setFilteredData([]);

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
    <>
      {/* 검색창 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          borderRadius: "5px",
          padding: "5px 10px",
          marginBottom: "20px",
        }}
      >
        <SearchIcon sx={{ marginRight: "8px" }} />
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* 검색 결과 */}
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        検索結果
      </Typography>
      <Typography variant="h5">ARTIST</Typography>

      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Loading />
        </Box>
      ) : filteredData.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          検索結果がありません。
        </Typography>
      ) : (
        <Box sx={{ overflowX: "auto", overflowY: "hidden" }}>
          <ImageList
            sx={{
              display: "flex",
              overflowX: "auto",
              overflowY: "hidden",
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
                onClick={() => setSelectedMovie(item)} // 이미지 클릭 시 detail 열기
                sx={{
                  flex: "0 0 auto",
                  width: {
                    xs: "45%",
                    sm: "30%",
                    md: "20%",
                    lg: "15%",
                  },
                  textAlign: "center",
                  position: "relative",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.2s",
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
                    borderRadius: "5px",
                  }}
                  onDragStart={(e) => e.preventDefault()}
                />
                <ImageListItemBar
                  title={item.title}
                  position="bottom"
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
                    borderRadius: "5px",
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
          onClose={() => setSelectedMovie(null)} // 닫기 기능 추가
        />
      )}
    </>
  );
};

export default SearchPage;
