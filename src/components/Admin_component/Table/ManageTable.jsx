import React, { useEffect, useState, useContext } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const MIN_ROWS = 10;

const ManageTable = ({
  users,
  loading,
  error,
  onSortChange,
  orderBy,
  ascending,
}) => {
  const { translations } = useContext(LanguageContext);
  const [selected, setSelected] = useState([]);
  const Navigate = useNavigate();
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

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
              <TableSortLabel
                active={orderBy === "name"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("name")}
              >
                {translations.managetable.name}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("email")}
              >
                {translations.managetable.email}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "userType"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("userType")}
              >
                {translations.managetable.state}
              </TableSortLabel>
            </TableCell>
            <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
              <TableSortLabel
                active={orderBy === "createdAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("createdAt")}
              >
                {translations.managetable.date}
              </TableSortLabel>
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
                {user.userType}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                {dayjs(user.createdAt).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell padding="none" sx={{ whiteSpace: "nowrap", px: 2 }}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => Navigate(`/admin/adminedit/${user.id}`)}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
