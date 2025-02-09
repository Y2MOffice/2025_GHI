import React, { useState } from "react";
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
} from "@mui/material";

const dummyData = Array.from({ length: 35 }, (_, index) => ({
  id: index + 1,
  detail: "写真購入",
  amount: `${(index % 2 === 0 ? 990 : 1490).toLocaleString()}円`,
  date: `2024-0${(index % 9) + 1}-17 11:30:${10 + index}`,
}));

const PhotoPurchaseHistory = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = dummyData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#c1a3a3", color: "rgb(250, 241, 242)", height: "100vh" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        写真購入履歴
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "#7d5959" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid rgb(250, 241, 242)" }}>
              <TableCell
                sx={{ color: "rgb(250, 241, 242)", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                内訳
              </TableCell>
              <TableCell
                sx={{
                  color: "rgb(250, 241, 242)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "right",
                }}
              >
                金額
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}
              >
                <TableCell sx={{ color: "rgb(250, 241, 242)" }}>
                  <Typography variant="body1">{row.detail}</Typography>
                  <Typography variant="caption" sx={{ color: "rgb(250, 241, 242)" }}>
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: "rgb(250, 241, 242)", textAlign: "right" }}>
                  <Typography variant="body1">{row.amount}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(dummyData.length / itemsPerPage)}
          color="secondary"
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#faf1f2",
              borderColor: "#faf1f2",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#7d5959",
              color: "#faf1f2",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#faf1f2",
            },
            "& .MuiPaginationItem-icon": {
              color: "#faf1f2",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PhotoPurchaseHistory;
