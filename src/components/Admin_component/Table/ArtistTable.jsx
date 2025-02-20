import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";

// 유저 데이터
const artistData = [
  {
    id: "0",
    name: "트와이스",
    description: "JYP 엔터테인먼트 소속의 9인조 걸그룹으로, 2015년에 데뷔했다.",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "1",
    name: "BTS",
    description:
      "빅히트 뮤직 소속의 7인조 보이그룹으로, 글로벌적인 인기를 끌고 있다.",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "2",
    name: "뉴진스",
    description:
      "하이브 산하 어도어 소속의 5인조 걸그룹으로, 독창적인 음악 스타일을 선보인다.",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "3",
    name: "세븐틴",
    description:
      "플레디스 엔터테인먼트 소속의 13인조 보이그룹으로, 자체 프로듀싱 그룹으로 유명하다.",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
  {
    id: "4",
    name: "아이브",
    description:
      "스타쉽 엔터테인먼트 소속의 6인조 걸그룹으로, 2021년에 데뷔했다.",
    created_at: "2024-02-21",
    updated_at: "2024-02-21",
  },
];

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const MIN_ROWS = 10; // 최소 표시할 행 개수

const ManageTable = () => {
  const { translations } = useContext(LanguageContext);
  const [artists, setArtists] = useState(artistData);
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  // 체크박스 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 빈 행 추가 (테이블 높이를 유지하려고)
  const emptyRows = Math.max(MIN_ROWS - artists.length, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: "auto" }} // 스크롤 가능
    >
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < artists.length
                }
                checked={selected.length === artists.length}
                onChange={() =>
                  setSelected(
                    selected.length === artists.length
                      ? []
                      : artists.map((u) => u.id)
                  )
                }
              />
            </TableCell>
            <TableCell padding="none">
              {translations.artisttable.name}
            </TableCell>
            <TableCell padding="none">
              {translations.artisttable.description}
            </TableCell>
            <TableCell padding="none">
              {translations.artisttable.created_at}
            </TableCell>
            <TableCell padding="none">
              {translations.artisttable.updated_at}
            </TableCell>
            <TableCell padding="none">
              {translations.artisttable.manage}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </TableCell>
              <TableCell padding="none">{user.name}</TableCell>
              <TableCell padding="none">
                {truncateText(user.description, isMobile ? 6 : 15)}
              </TableCell>

              <TableCell padding="none">
                {dayjs(user.created_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                {dayjs(user.updated_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate("/admin/artistsedit")}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small">
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {/* 부족한 행을 빈 행으로 채움 */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={7} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="error"
        disabled={selected.length === 0}
        style={{ margin: "10px" }}
      >
        {translations.managetable.delete}
      </Button>
    </TableContainer>
  );
};

export default ManageTable;
