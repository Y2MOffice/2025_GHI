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

const MIN_ROWS = 10;

const PaymentsTable = ({
  payments = [],
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

  const emptyRows = Math.max(MIN_ROWS - payments.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Name"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Name")}
              >
                {translations.paymentTable.name}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "NickName"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("NickName")}
              >
                {translations.paymentTable.nickname}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Email")}
              >
                {translations.paymentTable.email}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "UserType"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("UserType")}
              >
                {translations.paymentTable.usertype}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PaymentMethod"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("PaymentMethod")}
              >
                {translations.paymentTable.payment}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PaymentStatus"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("PaymentStatus")}
              >
                {translations.paymentTable.paystatus}
              </TableSortLabel>
            </TableCell>
            <TableCell>{translations.paymentTable.price}</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "CreatedAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("CreatedAt")}
              >
                {translations.paymentTable.date}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.lastName} {item.firstName}
              </TableCell>
              <TableCell>{item.userNickName}</TableCell>
              <TableCell>{item.userEmail}</TableCell>
              <TableCell>{item.userType}</TableCell>
              <TableCell>{item.paymentMethod}</TableCell>
              <TableCell>{item.paymentStatus}</TableCell>
              <TableCell>{item.sakuraAmount}</TableCell>
              <TableCell>
                {dayjs(item.createdAt).format("YYYY-MM-DD")}
              </TableCell>
            </TableRow>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={8} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
