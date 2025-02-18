import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";

// 유저 데이터
const usersData = [
  {
    id: "hello",
    name: "김철수",
    email: "chulsoo@example.com",
    status: "Active",
    createdAt: "2024-02-10",
  },
  {
    id: "world",
    name: "이영희",
    email: "younghee@example.com",
    status: "Banned",
    createdAt: "2023-12-25",
  },
  {
    id: "bye1",
    name: "박민수",
    email: "minsoo@example.com",
    status: "Inactive",
    createdAt: "2023-11-15",
  },
  {
    id: "bye2",
    name: "박민수",
    email: "minsoo@example.com",
    status: "Inactive",
    createdAt: "2023-11-15",
  },
];

const MIN_ROWS = 10; // 최소 표시할 행 개수

const ManageTable = () => {
  const [users, setUsers] = useState(usersData);
  const [selected, setSelected] = useState([]);

  // 체크박스 선택 핸들러
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 빈 행 추가 (테이블 높이를 유지하려고)
  const emptyRows = Math.max(MIN_ROWS - users.length, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: "auto" }} // 스크롤 가능
    >
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox">
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
            {[
              { id: "id", label: "ID" },
              { id: "name", label: "이름" },
              { id: "email", label: "이메일" },
              { id: "status", label: "상태" },
              { id: "createdAt", label: "가입 날짜" },
            ].map((headCell) => (
              <TableCell key={headCell.id} padding="none">
                <TableSortLabel active={false}>{headCell.label}</TableSortLabel>
              </TableCell>
            ))}
            <TableCell padding="none">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </TableCell>
              <TableCell padding="none">{user.id}</TableCell>
              <TableCell padding="none">{user.name}</TableCell>
              <TableCell padding="none">{user.email}</TableCell>
              <TableCell padding="none">{user.status}</TableCell>
              <TableCell padding="none">
                {dayjs(user.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none">
                <IconButton color="primary" size="small">
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
        선택 삭제
      </Button>
    </TableContainer>
  );
};

export default ManageTable;
