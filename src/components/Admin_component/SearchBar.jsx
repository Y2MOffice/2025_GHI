import {
  InputBase,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const SearchBar = () => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="検索内容"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
      <ThemeProvider theme={theme}>
        <Button variant="contained" disableElevation>
          検索
        </Button>
      </ThemeProvider>
    </Box>
  );
};

export default SearchBar;
