import { Button, createTheme, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as XLSX from "xlsx";
import { apiRequest } from "../../utils/api";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const DownloadButton = ({ fetchUrl, fileName = "data.xlsx", searchParams = {}, orderBy, ascending }) => {
  const { translations } = useContext(LanguageContext);

  const handleDownload = async () => {
    try {
      const params = Object.fromEntries(
        Object.entries({
          ...searchParams,
          page: 1,
          pageSize: 10000,
          orderBy,
          ascending,
        }).filter(([_, v]) => v !== "")
      );

      const queryString = new URLSearchParams(params).toString();
      const json = await apiRequest(`${fetchUrl}?${queryString}`);
      
      if (json.resultCode !== 0 || !json.data?.items) {
        alert("데이터를 불러오지 못했습니다.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(json.data.items);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("다운로드 오류:", error);
      alert("다운로드 중 오류 발생");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" disableElevation onClick={handleDownload}>
        {translations.managetable.download}
      </Button>
    </ThemeProvider>
  );
};

export default DownloadButton;
