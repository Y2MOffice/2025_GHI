// PaymentsTable.jsx
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

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

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
                이름
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "NickName"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("NickName")}
              >
                닉네임
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "Email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("Email")}
              >
                이메일
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "UserType"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("UserType")}
              >
                회원 구분
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PaymentMethod"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("PaymentMethod")}
              >
                결제 수단
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PaymentStatus"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("PaymentStatus")}
              >
                결제 상태
              </TableSortLabel>
            </TableCell>
            <TableCell>금액</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "CreatedAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("CreatedAt")}
              >
                결제일
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
