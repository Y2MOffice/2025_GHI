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

const dummyData = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  detail: "ポイント決済",
  amount: `${(index % 2 === 0 ? 500 : 1000).toLocaleString()}円`,
  date: `2024-0${(index % 9) + 1}-17 11:30:${10 + index}`,
}));

const PointHistory = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = dummyData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#191919", color: "white" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        ポイント決済履歴
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "#252525" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid white" }}>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                内訳
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
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
                <TableCell sx={{ color: "white" }}>
                  <Typography variant="body1">{row.detail}</Typography>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "right" }}>
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
        />
      </Box>
    </Box>
  );
};

export default PointHistory;
