// PaymentsManagePage.jsx
import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import PaginationComponent from "../../components/Admin_component/PaginationComponent";
import DownloadButton from "../../components/Admin_component/DownloadButton";
import PaymentsTable from "../../components/Admin_component/Table/PaymentsTable";
import SearchPaymentsArea from "../../components/Admin_component/SearchPaymentsArea";
import { useMediaQuery } from "@mui/material";
import { apiRequest } from "../../utils/api";

const PaymentsManagePage = () => {
  const { translations } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [payments, setPayments] = useState([]);
  const [orderBy, setOrderBy] = useState("CreatedAt");
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
    pageSize: 10,
  });

  const fetchPayments = async (params = {}) => {
    setLoading(true);
    try {
      const filteredParams = Object.fromEntries(
        Object.entries({
          ...params,
          page: pagination.page,
          orderBy,
          ascending,
        }).filter(([_, v]) => v !== "")
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const data = await apiRequest(`/payments?${queryString}`);
      setPayments(data.data.items || []);
      setPagination({
        totalPages: data.data.totalPages,
        page: data.data.page,
        pageSize: data.data.pageSize,
      });
    } catch (err) {
      console.error("결제 내역 가져오기 실패:", err);
      setError(err.message);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(searchParams);
  }, [pagination.page, orderBy, ascending]);

  const handleSortChange = (newOrderBy, newAscending) => {
    setOrderBy(newOrderBy);
    setAscending(newAscending);
    fetchPayments({
      ...searchParams,
      orderBy: newOrderBy,
      ascending: newAscending,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h5" fontWeight="bold">
          결제 내역 조회
        </Typography>
        <DownloadButton
          fetchUrl="/payments"
          fileName="Payments.xlsx"
          searchParams={searchParams}
          orderBy={orderBy}
          ascending={ascending}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 1,
          mb: 1,
          display: "flex",
          gap: 1,
          borderRadius: 2,
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <SearchPaymentsArea
          onSearch={(params) => {
            setSearchParams(params);
            fetchPayments(params);
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 1, borderRadius: 2, mb: 1 }}>
        <PaymentsTable
          payments={payments}
          loading={loading}
          error={error}
          orderBy={orderBy}
          ascending={ascending}
          onSortChange={handleSortChange}
        />
      </Paper>

      <Box display="flex" justifyContent="center" mt={1}>
        <PaginationComponent
          pagination={pagination}
          setPagination={setPagination}
        />
      </Box>
    </Container>
  );
};

export default PaymentsManagePage;
