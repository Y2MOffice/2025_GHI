import { Button, createTheme, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as XLSX from "xlsx";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[100],
      dark: pink[200],
    },
  },
});

const DownloadButton = ({ users }) => {
  const { translations } = useContext(LanguageContext);

  const handleDownload = () => {
    if (users.length === 0) {
      alert("다운로드할 데이터가 없습니다.");
      return;
    }

    // ✅ 엑셀 워크북 및 시트 생성
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admins");

    // ✅ 파일 저장
    XLSX.writeFile(workbook, "AdminData.xlsx");
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
