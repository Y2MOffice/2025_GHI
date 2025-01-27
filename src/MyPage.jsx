import { useState, useRef } from "react";
import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import MyPageList from "./data/MyPageList.js";
import MovieDetail from "./components/MovieDetail";
import ConditionalPopup from "./components/ConditionalPopup";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const contentRef = useRef(null);
  const isUserLoggedIn = false; // 로그인 조건. state등으로 변형하여 사용.
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit_account");
  };

  const handleMovieClick = (movie) => {
    if (!isUserLoggedIn) {
      setShowLoginPopup(true);
    } else {
      setSelectedMovie(movie); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "start" },
        padding: 3,
        backgroundColor: "#191919",
        color: "white",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Box
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "90%", md: "25%" },
          padding: 3,
          backgroundColor: "#1f1f1f",
          borderRadius: 2,
          marginBottom: { xs: 3, md: 0 },
          marginRight: { xs: 0, md: 3 },
          textAlign: "center",
        }}
      >
        <Avatar
          alt="Profile Picture"
          src=""
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ mt: 1, color: "rgb(200, 200, 200)" }}>
          名無しさん
        </Typography>

        <Box sx={{ textAlign: "center", mb: 2, color: "rgb(200, 200, 200)" }}>
          <Typography variant="body1">レビュー : 0</Typography>
          <Typography variant="body1">コメント : 1</Typography>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(184, 184, 184)",
            color: "rgb(184, 184, 184)",
            "&:hover": {
              borderColor: "rgb(200, 200, 200)",
              backgroundColor: "rgba(200, 200, 200, 0.1)",
            },
          }}
        >
          メンバーシップ
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(184, 184, 184)",
            color: "rgb(184, 184, 184)",
            "&:hover": {
              borderColor: "rgb(200, 200, 200)",
              backgroundColor: "rgba(200, 200, 200, 0.1)",
            },
          }}
          onClick={handleEditClick}
        >
          アカウント設定
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "rgb(184, 184, 184)",
            color: "rgb(184, 184, 184)",
            "&:hover": {
              borderColor: "rgb(200, 200, 200)",
              backgroundColor: "rgba(200, 200, 200, 0.1)",
            },
          }}
        >
          カスタマーサポート
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "rgb(184, 184, 184)",
            color: "rgb(184, 184, 184)",
            "&:hover": {
              borderColor: "rgb(200, 200, 200)",
              backgroundColor: "rgba(200, 200, 200, 0.1)",
            },
          }}
        >
          ログアウト
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "75%" },
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          お気に入りの映画
        </Typography>
        <Grid container spacing={2}>
          {MyPageList.map((item) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={item.id}
              onClick={() => handleMovieClick(item)}
            >
              <Box
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                  onDragStart={(e) => e.preventDefault()}
                />
                <Typography variant="subtitle1">{item.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {showLoginPopup && (
          <ConditionalPopup onClose={() => setShowLoginPopup(false)} />
        )}
    </Box>
  );
};

export default MyPage;
