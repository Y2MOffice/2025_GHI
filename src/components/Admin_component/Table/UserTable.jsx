import React, { useState, useEffect, useContext } from "react";
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
import { apiRequest } from "../../../utils/api";

const MIN_ROWS = 10;

const UserTable = ({
  users,
  loading,
  error,
  onUserDeleted,
  onSortChange,
  orderBy,
  ascending,
}) => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

  const handleDeleteUser = async (user) => {
    const token = sessionStorage.getItem("token");

    const confirmDelete = window.confirm(
      `${user.firstName} ${user.lastName} ${translations.usertable.deletequestion}`
    );
    if (!confirmDelete) return;

    try {
      await apiRequest(`/users/${user.id}`, "DELETE");

      alert(
        `${user.firstName} ${user.lastName} ${translations.usertable.deletesuccess}`
      );
      onUserDeleted();
    } catch (err) {
      alert(`${translations.usertable.deletefailed}: ${err.message}`);
    }
  };

  const emptyRows = Math.max(MIN_ROWS - users.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell>ID</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("name")}
              >
                {translations.usertable.name}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("email")}
              >
                {translations.usertable.email}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "createdAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("createdAt")}
              >
                {translations.usertable.date}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "isDeleted"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("isDeleted")}
              >
                {translations.usertable.state}
              </TableSortLabel>
            </TableCell>
            <TableCell>{translations.usertable.manage}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                {translations.usertable.loading}
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={9} align="center" style={{ color: "red" }}>
                {translations.usertable.error}: {error}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} sx={{ height: "40px" }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {dayjs(user.createdAt).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{user.isDeleted ? "Inactive" : "Active"}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/admin/useredit/${user.id}`)}
                    disabled={user.isDeleted}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteUser(user)}
                    disabled={user.isDeleted}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}

          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={9} />
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
};

export default UserTable;
