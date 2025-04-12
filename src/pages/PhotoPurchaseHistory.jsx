import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  useTheme,
} from "@mui/material";
import { apiRequest } from "../utils/api";

const PhotoPurchaseHistory = () => {
  const theme = useTheme();
  const { translations } = useContext(LanguageContext);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchPurchaseHistory = async () => {
    try {
      const res = await apiRequest(
        `/me/purchases?page=${page}&pageSize=${itemsPerPage}`
      );
      if (res.resultCode === 0 && Array.isArray(res.data.items)) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("구매 내역 불러오기 오류:", error.message);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, [page]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        {translations.pphis.name}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {translations.pphis.list}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "right",
                }}
              >
                {translations.pphis.price}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  {translations.pphis.empty || "購入履歴がありません。"}
                </TableCell>
              </TableRow>
            ) : (
              items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography variant="body1">
                      {row.detail || "写真購入"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(row.createdAt).toLocaleString("ja-JP")}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Typography variant="body1">
                      {row.amount?.toLocaleString() || "0"}円
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PhotoPurchaseHistory;
