import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import { apiRequest } from "../../utils/api";
import dayjs from "dayjs";

const UserPaymentTab = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("paidAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
      const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await apiRequest(`/users/${userId}/payments`);
        if (response.resultCode === 0) {
          setPayments(response.data);
        } else {
          setError(response.errorMessage || "Unknown Error");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = payments.slice().sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <p>{translations.gloval.loading}</p>;
  if (error) return <p style={{ color: "red" }}>{translations.gloval.error} {error}</p>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {translations.userpaymenttab.title}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={order}
                  onClick={() => handleSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "sakuraAmount"}
                  direction={order}
                  onClick={() => handleSort("sakuraAmount")}
                >
                  {translations.userpaymenttab.price}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "paymentMethod"}
                  direction={order}
                  onClick={() => handleSort("paymentMethod")}
                >
                  {translations.userpaymenttab.method}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "paymentStatus"}
                  direction={order}
                  onClick={() => handleSort("paymentStatus")}
                >
                  {translations.userpaymenttab.status}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "createdAt"}
                  direction={order}
                  onClick={() => handleSort("createdAt")}
                >
                  {translations.userpaymenttab.date}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.id}</TableCell>
                  <TableCell>{entry.sakuraAmount}</TableCell>
                  <TableCell>{entry.paymentMethod}</TableCell>
                  <TableCell>{entry.paymentStatus}</TableCell>
                  <TableCell>
                    {dayjs(entry.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={payments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default UserPaymentTab;
