import React, { useState, useContext } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { pink } from "@mui/material/colors";

// 유저 데이터
const purchaseData = [
  {
    "id": "0",
    "user_id": "101",
    "photo_collection_id": "0",
    "price": 39.99,
    "created_at": "2024-02-21T14:30:00Z"
  },
  {
    "id": "1",
    "user_id": "102",
    "photo_collection_id": "1",
    "price": 59.99,
    "created_at": "2024-02-20T12:15:00Z"
  },
  {
    "id": "2",
    "user_id": "103",
    "photo_collection_id": "2",
    "price": 42.50,
    "created_at": "2024-02-19T18:45:00Z"
  },
  {
    "id": "3",
    "user_id": "104",
    "photo_collection_id": "3",
    "price": 45.00,
    "created_at": "2024-02-18T10:05:00Z"
  },
  {
    "id": "4",
    "user_id": "105",
    "photo_collection_id": "4",
    "price": 50.00,
    "created_at": "2024-02-17T22:00:00Z"
  }
];

const MIN_ROWS = 10; // 최소 표시할 행 개수

const PurchaseTable = () => {
  const { translations } = useContext(LanguageContext);
  const [purchase, setPurchase] = useState(purchaseData);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // 빈 행 추가 (테이블 높이를 유지하려고)
  const emptyRows = Math.max(MIN_ROWS - purchase.length, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: "auto" }} // 스크롤 가능
    >
      <Table size="small" sx={{ minWidth: "100%" }}>
        <TableHead sx={{ backgroundColor: pink[50] }}>
          <TableRow sx={{ height: "40px" }}>
            <TableCell padding="none">
              {translations.purchasetable.user_id}
            </TableCell>
            <TableCell padding="none">
              {translations.purchasetable.photo_collection_id}
            </TableCell>
            <TableCell padding="none">
              {translations.purchasetable.price}
            </TableCell>
            <TableCell padding="none">
              {translations.purchasetable.created_at}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchase.map((user) => (
            <TableRow key={user.id} sx={{ height: "40px" }}>
              <TableCell padding="none">{user.user_id}</TableCell>
              <TableCell padding="none">{user.photo_collection_id}</TableCell>
              <TableCell padding="none">{user.price}</TableCell>
              <TableCell padding="none">
                {dayjs(user.created_at).format("YYYY-MM-DD")}
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

export default PurchaseTable;
