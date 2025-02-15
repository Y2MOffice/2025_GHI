import React from "react";
import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
}); //color

const handleChange = (event, value) => {
  console.log("클릭한 페이지 번호", value);
};

const PaginationComponent = () => {
  return (
    // backend 연결 후 수정
    <ThemeProvider theme={theme}>
      <Pagination
        onChange={handleChange}
        count={20} //총페이지
        boundaryCount={1} //맨 처음과 마지막에 몇개의 페이지가 보이는지
        siblingCount={1}
        shape="rounded"
        color="primary"
        showFirstButton //제일 첫번째 페이지로 이동
        showLastButton //제일 마지막 페이지로 이동
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
