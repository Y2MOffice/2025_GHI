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

const LoginHistoryTab = ({ userId }) => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("loginTime");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await apiRequest(`/users/${userId}/login-history`);
        if (response.resultCode === 0) {
          setLoginHistory(response.data);
        } else {
          setError(response.errorMessage || "Unknown Error");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginHistory();
  }, [userId]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = loginHistory.slice().sort((a, b) => {
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
        {translations.loginhistory.history}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "loginTime"}
                  direction={order}
                  onClick={() => handleSort("loginTime")}
                >
                  {translations.loginhistory.time}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ipAddress"}
                  direction={order}
                  onClick={() => handleSort("ipAddress")}
                >
                  {translations.loginhistory.ip}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "deviceType"}
                  direction={order}
                  onClick={() => handleSort("deviceType")}
                >
                  {translations.loginhistory.device}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "country"}
                  direction={order}
                  onClick={() => handleSort("country")}
                >
                  {translations.loginhistory.country}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {dayjs(entry.loginTime).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>{entry.ipAddress}</TableCell>
                  <TableCell>{entry.deviceType}</TableCell>
                  <TableCell>{entry.country}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={loginHistory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default LoginHistoryTab;
