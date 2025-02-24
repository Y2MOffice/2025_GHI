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

const usersData = [
  {
    id: 1,
    firstName: "김",
    lastName: "철수",
    email: "chulsoo@example.com",
    phoneNumber: "01011111111",
    nickname: "철수",
    userType: "user",
    isDeleted: false,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
];

const MIN_ROWS = 10;

const UserTable = () => {
  const { translations } = useContext(LanguageContext);
  const [users, setUsers] = useState(usersData);
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const emptyRows = Math.max(MIN_ROWS - users.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="checkbox" sx={{ whiteSpace: "nowrap", px: 1 }}>
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
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              ID
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.name}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.nickname}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.email}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 5 }}>
              {translations.usertable.phonenumber}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.usertype}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.date}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.status}
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
              {translations.usertable.manage}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell
                padding="checkbox"
                sx={{ whiteSpace: "nowrap", px: 1 }}
              >
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {user.id}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {`${user.firstName} ${user.lastName}`}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {user.nickname}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {user.email}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 5 }}>
                {user.phoneNumber}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {user.userType}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {dayjs(user.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                {user.isDeleted ? "Deleted" : "Active"}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 1 }}>
                <IconButton color="primary" size="small">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small">
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {/* 빈 행 추가 (빈 행의 colSpan를 전체 열 수 10으로 수정) */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={10} />
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

export default UserTable;
