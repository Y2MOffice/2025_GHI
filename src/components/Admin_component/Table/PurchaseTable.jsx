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

const PurchaseTable = ({
  purchase = [],
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

  // 부족한 행을 채우기 위해 빈 행 추가
  const emptyRows = Math.max(MIN_ROWS - purchase.length, 0);

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PurchasedAt"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("PurchasedAt")}
              >
                {translations.purchasetable.purchased_at}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("title")}
              >
                {translations.purchasetable.title}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("name")}
              >
                {translations.purchasetable.name}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={ascending ? "asc" : "desc"}
                onClick={() => handleRequestSort("email")}
              >
                {translations.purchasetable.email}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchase.length > 0 ? (
            purchase.map((purchase) => (
              <TableRow key={purchase.id} sx={{ height: "40px" }}>
                <TableCell>
                  {dayjs(purchase.purchasedAt).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{purchase.photoCollectionTitle}</TableCell>
                <TableCell>{purchase.userName}</TableCell>
                <TableCell>{purchase.userEmail}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                {translations.purchasetable.no_data}
              </TableCell>
            </TableRow>
          )}
          {/* 부족한 행을 빈 행으로 채움 */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} sx={{ height: "40px" }}>
              <TableCell colSpan={4} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;
