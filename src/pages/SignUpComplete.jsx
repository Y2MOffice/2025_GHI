import {
  Box,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";

const SignUpComplete = () => {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
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
          component={Link}
          to="/"
          sx={{
            mt: 2,
            backgroundColor: pink[100],
            color: "#fff",
            "&:hover": {
              backgroundColor: pink[200],
            },
          }}
        >
          ホームページに移動
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpComplete;
