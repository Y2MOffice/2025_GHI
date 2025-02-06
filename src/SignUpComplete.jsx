import {
  Box,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUpComplete = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: "#c1a3a3",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#c1a3a3",
            color: "#FFFFFF",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // 수직 정렬
          justifyContent: "center", // 세로 중앙 정렬
          alignItems: "center", // 가로 중앙 정렬
          height: "calc(100vh - 64px)", // 화면 전체 높이
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem", // 모바일 화면 (xs)에서는 글씨 크기를 작게
              sm: "2rem", // 작은 화면 (sm)에서는 중간 크기
              md: "2.5rem", // 일반 화면에서는 기본 크기
            },
          }}
        >
          🎉おめでとう！🎉
          <br />
          これからネットフリックスで楽しい
          <br />
          時間を過ごしてください。
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{
            mt: 2,
            backgroundColor: "#7d5959",
            "&:hover": {
              backgroundColor: "#7d5959",
            },
          }}
          component={Link}
          to="/login"
        >
          ログインページへ移動
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpComplete;
