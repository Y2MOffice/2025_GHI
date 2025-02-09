import { useState, useRef } from "react";
import { Box, Typography, IconButton, Slide, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const MovieDetail = ({ movie, onClose }) => {
  const contentRef = useRef(null);
  const [show, setShow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false); //구매여부 임시
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleWheel = (e) => {
    const content = contentRef.current;
    const isAtTop = content.scrollTop === 0;
    const isAtBottom =
      content.scrollHeight - content.scrollTop === content.clientHeight;

    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseDown = (e) => {
    const content = contentRef.current;
    setIsDragging(true);
    setDragStartY(e.clientY);
    setScrollStartY(content.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const content = contentRef.current;
    const dragDistance = e.clientY - dragStartY;
    content.scrollTop = scrollStartY - dragDistance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={contentRef}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleMouseDown(e);
        }}
        onMouseMove={(e) => {
          e.stopPropagation();
          handleMouseMove(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            background: "linear-gradient(to right, #c1a3a3,rgb(182, 137, 137))",
            color: "rgb(250, 241, 242)",
            borderRadius: 2,
            maxWidth: "400px",
            width: "70%",
            padding: "20px",
            overflowY: "auto",
            maxHeight: "90%",
            position: "relative",
            userSelect: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "rgb(250, 241, 242)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 1, ml: 5 }}>
            {movie?.title}
          </Typography>
          <img
            src={movie?.mainImg[0]}
            alt={movie?.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            onDragStart={(e) => e.preventDefault()}
          />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {movie?.summary}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, mb: 2 }}>
            {movie?.tags?.map((tag, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
                onClick={() => console.log(`Clicked tag: ${tag}`)} //작동 테스트
              >
                #{tag}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
            <Typography
              variant="body1"
              sx={{ minWidth: "100px", textAlign: "left" }}
            >
              금액 : {movie?.price}원
            </Typography>
            <Button
              variant="contained"
              color={isPurchased ? "success" : "primary"}
              onClick={() => {
                if (isPurchased) {
                  navigate(`/viewPage/${movie.id}`);
                } else {
                  setIsPurchased(true); // 구매처리
                }
              }} //추후 수정
              sx={{
                flexGrow: 1,
                maxWidth: "150px",
                textAlign: "center",
                backgroundColor: "#7d5959", // 버튼 배경색 변경
                "&:hover": {
                  backgroundColor: "#6c4f4f", // 호버 시 색상 변경 (살짝 어두운 톤)
                },
              }}
            >
              {isPurchased ? "작품보기" : "구매하기"}
            </Button>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie?.content}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Box
              sx={{ flex: 1, position: "relative", cursor: "pointer" }}
              onClick={() => console.log("첫 번째 이미지 클릭")}
            >
              <img
                src={movie?.img[0]}
                alt={movie?.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
                onDragStart={(e) => e.preventDefault()}
              />
            </Box>

            <Box
              sx={{ flex: 1, position: "relative", cursor: "pointer" }}
              onClick={() => console.log("두 번째 이미지 클릭")}
            >
              <img
                src={movie?.img[1]}
                alt={movie?.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
                onDragStart={(e) => e.preventDefault()}
              />
            </Box>

            <Box
              sx={{ flex: 1, position: "relative" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={movie?.img[2]}
                alt={movie?.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  filter: isHovered ? "blur(3px)" : "blur(0px)",
                  transition: "filter 0.3s ease",
                }}
                onDragStart={(e) => e.preventDefault()}
              />
              {isHovered && (
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "rgb(250, 241, 242)",
                    fontWeight: "bold",
                  }}
                  onClick={() => console.log("구매하기")} //임시
                >
                  구매하기
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default MovieDetail;
