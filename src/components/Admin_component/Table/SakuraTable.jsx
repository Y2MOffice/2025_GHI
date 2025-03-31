import React, { useContext } from "react";
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
} from "@mui/material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";

const MIN_ROWS = 10; // 최소 표시할 행 개수

const SakuraTable = ({
  purchase = [],
  loading,
  error,
  onSortChange,
  orderBy,
  ascending,
}) => {
  const { translations } = useContext(LanguageContext);

  if (loading) return <p>{translations.gloval.loading}</p>;
  if (error) return <p style={{ color: "red" }}>{translations.gloval.error} {error}</p>;


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && ascending;
    onSortChange(property, !isAsc);
  };

  const emptyRows = Math.max(MIN_ROWS - purchase.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === "UserName"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("UserName")}
              >
                {translations.sakuratable.userName}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Email")}
              >
                {translations.sakuratable.email}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "TransactionType"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("TransactionType")}
              >
                {translations.sakuratable.transaction_type}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Amount"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Amount")}
              >
                {translations.sakuratable.amount}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Is_paid"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Is_paid")}
              >
                {translations.sakuratable.is_paid}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Created_at"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Created_at")}
              >
                {translations.sakuratable.created_at}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchase.map((purchase) => (
            <TableRow key={purchase.id} sx={{ height: "40px" }}>
              <TableCell>{purchase.userName}</TableCell>
              <TableCell>{purchase.userEmail}</TableCell>
              <TableCell>{purchase.transactionType}</TableCell>
              <TableCell>{purchase.amount}</TableCell>
              <TableCell>{purchase.isPaid ? "O" : "X"}</TableCell>
              <TableCell>
                {dayjs(purchase.createdAt).format("YYYY-MM-DD")}
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
    </TableContainer>
  );
};

export default SakuraTable;
