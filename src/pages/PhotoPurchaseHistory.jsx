import React, { useState, useContext, useEffect } from "react";
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
} from "@mui/material";
import { apiRequest } from "../utils/api";

const PhotoPurchaseHistory = () => {
  const { translations } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest("/me/purchases");
        if (res?.resultCode === 0) {
          const formatted = res.data.map((item) => ({
            id: item.id,
            detail: item.photoCollectionTitle,
            amount: `${
              item.photoCollectionPrice?.toLocaleString() || 0
            } sakura`,
            date: formatDate(item.purchasedAt),
          }));
          setData(formatted);
        } else {
          console.error("error", res.errorMessage);
        }
      } catch (err) {
        console.error("API error", err);
      }
    };
    fetchData();
  }, []);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#c1a3a3",
        color: "rgb(250, 241, 242)",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {translations.pphis.name}
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "#7d5959" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid rgb(250, 241, 242)" }}>
              <TableCell
                sx={{
                  color: "rgb(250, 241, 242)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {translations.pphis.list}
              </TableCell>
              <TableCell
                sx={{
                  color: "rgb(250, 241, 242)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "right",
                }}
              >
                {translations.pphis.price}
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
                  <Typography
                    variant="caption"
                    sx={{ color: "rgb(250, 241, 242)" }}
                  >
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ color: "rgb(250, 241, 242)", textAlign: "right" }}
                >
                  <Typography variant="body1">{row.amount}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
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
            "& .MuiPaginationItem-ellipsis": { color: "#faf1f2" },
            "& .MuiPaginationItem-icon": { color: "#faf1f2" },
          }}
        />
      </Box>
    </Box>
  );
};

export default PhotoPurchaseHistory;
