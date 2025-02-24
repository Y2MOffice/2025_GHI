import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

// 유저 데이터
const usersData = [
  {
    id: "hello",
    name: "김철수",
    email: "chulsoo@example.com",
    status: "Active",
    createdAt: "2024-02-10",
  },
];

const MIN_ROWS = 10; // 최소 표시할 행 개수

const ManageTable = () => {
  const { translations } = useContext(LanguageContext);
  const [users, setUsers] = useState(usersData);
  const [selected, setSelected] = useState([]);
  const Navigate = useNavigate();

  // 체크박스 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 빈 행 추가 (테이블 높이를 유지하려고)
  const emptyRows = Math.max(MIN_ROWS - users.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < users.length
                }
                checked={selected.length === users.length}
                onChange={() =>
                  setSelected(
                    selected.length === users.length
                      ? []
                      : users.map((u) => u.id)
                  )
                }
              />
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              ID
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.managetable.name}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.managetable.email}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.managetable.state}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.managetable.date}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              {translations.managetable.manage}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell
                padding="checkbox"
                sx={{ whiteSpace: "nowrap", px: 2 }}
              >
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {user.id}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {user.name}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {user.email}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {user.status}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {dayjs(user.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => Navigate("/admin/adminedit")}
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
