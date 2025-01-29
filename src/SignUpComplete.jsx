import {
  Box,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUpComplete = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: "#191919",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#191919",
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
        <Typography variant="h4" align="center" gutterBottom>
          🎉おめでとう！🎉
          <br />
          これからネットフリックスで楽しい時間を過ごしてください。
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
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
