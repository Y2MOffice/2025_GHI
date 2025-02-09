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
import dataList from "../data/List"; // 기존 data 가져오기

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [data, setData] = useState([]); // 데이터 상태 추가

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(dataList);
      setIsLoading(false);
    }, 500); //(임시)
  }, []);

  // 검색어 입력 핸들러
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 엔터 입력 시 검색 실행
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const keyword = searchTerm.trim();
      navigate(`/search?q=${keyword}`);
    }
  };

  // 쿼리스트링에서 검색어 추출
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || searchTerm;

  // 검색어로 데이터 필터링
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 가로 스크롤 기능 (드래그)
  const handleMouseDown = (e) => {
    const row = rowRef.current;
    row.isDragging = true;
    row.startX = e.pageX - row.offsetLeft;
    row.scrollLeftStart = row.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const row = rowRef.current;
    if (!row.isDragging) return;
    setIsDragging(true);
    const x = e.pageX - row.offsetLeft;
    const walk = x - row.startX;
    row.scrollLeft = row.scrollLeftStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    rowRef.current.isDragging = false;
  };

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

      {/* 로딩 중일 때 */}
      {isLoading ? (
        <Loading width={210} height={118} />
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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {filteredData.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{
                  flex: "0 0 auto",
                  width: {
                    xs: "45%",
                    sm: "30%",
                    md: "20%",
                    lg: "15%",
                  },
                  aspectRatio: "2 / 3",
                  textAlign: "center",
                  position: "relative",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.2s",
                }}
              >
                <Box
                  component="img"
                  src={item.mainImg}
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
    </>
  );
};

export default SearchPage;
