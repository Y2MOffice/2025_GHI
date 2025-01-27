import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Grid, Box } from "@mui/material";
import data from "./data/List";
import MovieDetail from "./components/MovieDetail";

const SearchPage = () => {
  const location = useLocation();

  // 쿼리스트링에서 검색어 추출
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  // 검색어로 데이터 필터링
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClick = (item) => {
    setSelectedMovie(item); // 클릭한 영화 데이터를 설정
  };

  const closeDetail = () => {
    setTimeout(() => {
      setSelectedMovie(null); // 모달 닫기
    }, 300);
  };

  return (
    <>
      <h1>検索結果</h1>
      {/* 검색 결과가 없는 경우 */}
      {filteredData.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          検索結果がありません。
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {/* 검색 결과를 표시 */}
          {filteredData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer", // 클릭 가능 표시
                }}
                onClick={() => handleClick(item)} // 클릭 이벤트 추가
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 영화 상세 보기 모달 */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={closeDetail} />
      )}
    </>
  );
};

export default SearchPage;
