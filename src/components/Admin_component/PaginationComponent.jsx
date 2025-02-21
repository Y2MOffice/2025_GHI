import React from "react";
import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useNavigate, useSearchParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
}); //color

const PaginationComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //url에서 query값 받앙ㅗ기
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleChange = (event, value) => {
    console.log("클릭한 페이지 번호", value);
    navigate(`?query=${query}&page=${value}`);
  };
  return (
    // backend 연결 후 수정
    <ThemeProvider theme={theme}>
      <Pagination
        onChange={handleChange}
        page={currentPage}
        count={20} //총페이지
        siblingCount={1}
        shape="rounded"
        color="primary"
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
