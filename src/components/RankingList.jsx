import { useRef, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
} from "@mui/material";
import MovieDetail from "./MovieDetail";
import FullView from "./FullView";

const List = ({ title, data }) => {
  const rowRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const handleMouseDown = (e) => {
    const row = rowRef.current;
    setIsDragging(false);
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
    const row = rowRef.current;
    row.isDragging = false;
  };

  const handleClick = (item) => {
    if (!isDragging) {
      setSelectedMovie(null); // 기존 선택 초기화
      setTimeout(() => {
        setSelectedMovie(item); // 새로운 선택 반영
        setIsFadingOut(false);
      }, 0); // 즉시 초기화 후 다시 설정
    }
  };

  const closeDetail = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 300);
  };

  const openFullView = () => {
    setIsFullViewOpen(true);
  };

  const closeFullView = () => {
    setIsFullViewOpen(false);
  };

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#e50914", cursor: "pointer" }}
          onClick={openFullView}
        >
          전부 보기
        </Typography>
      </Box>

      <ImageList
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          overflowX: "auto",
          overflowY: "hidden",
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          "::-webkit-scrollbar": { display: "none" },
          userSelect: "none",
          height: {
            xs: "72%",
            sm: "48%",
            md: "32%",
            lg: "24%",
          },
        }}
        ref={rowRef}
        cols={1}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {data.map((item, index) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleClick(item)}
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "72%",
                sm: "48%",
                md: "32%",
                lg: "24%",
              },
              display: "flex",
              position: "relative",
              "&:hover": { transform: "scale(1.05)" },
              transition: "transform 0.2s",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                left: index === 9 ? "1%" : "5%",
                top: "65%",
                transform: "translateY(-50%)", // 수직 중앙 정렬
                fontSize: index === 9 ? "130px" : "250px",
                fontWeight: "bold",
                color: "#191919", // 배경색
                "-webkit-text-stroke": index === 9 ? "3px white" : "5px white", // 하얀색 아웃라인
                opacity: 0.8, // 약간 투명
                zIndex: 1, // 이미지보다 아래
                letterSpacing: index === 9 ? "-15px" : null, // 글자 간격 조정
              }}
            >
              {index + 1}
            </Typography>

            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                width: "67%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
                marginLeft: "auto", // 오른쪽으로 정렬
                zIndex: 2, // 숫자 위에 배치
              }}
              onDragStart={(e) => e.preventDefault()} // 드래그 방지
            />

            <ImageListItemBar
              title={item.title}
              position="bottom"
              sx={{
                position: "absolute",
                width: "67%",
                marginLeft: "auto",
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
                color: "white",
                zIndex: 3,
                borderRadius: "5px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={closeDetail}
          isFadingOut={isFadingOut}
        />
      )}

      {isFullViewOpen && (
        <FullView
          data={data}
          title={title}
          onClose={closeFullView}
          isFadingOut={isFadingOut}
        />
      )}
    </Box>
  );
};

export default List;
