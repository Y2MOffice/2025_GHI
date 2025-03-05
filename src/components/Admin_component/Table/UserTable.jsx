import React, { useState, useEffect, useContext } from "react";
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

const MIN_ROWS = 10;

const UserTable = ({ users, loading, error }) => {
  const { translations } = useContext(LanguageContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

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
            <TableCell padding="checkbox" sx={{ px: 1 }}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < users.length
                }
                checked={selected.length === users.length}
                onChange={() =>
                  setSelected(
                    selected.length === users.length ? [] : users.map((u) => u.id)
                  )
                }
              />
            </TableCell>
            <TableCell>{translations.usertable.name}</TableCell>
            <TableCell>{translations.usertable.email}</TableCell>
            <TableCell>{translations.usertable.usertype}</TableCell>
            <TableCell>{translations.usertable.date}</TableCell>
            <TableCell>{translations.usertable.state}</TableCell>
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
                <TableCell padding="checkbox" sx={{ px: 1 }}>
                  <Checkbox
                    checked={selected.includes(user.id)}
                    onChange={() => handleSelect(user.id)}
                  />
                </TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>{dayjs(user.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{user.isDeleted ? "Inactive" : "Active"}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/admin/useredit/${user.id}`)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small">
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
