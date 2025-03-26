import React, { useEffect, useContext } from "react";
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from "../../contexts/LanguageContext";

const PaymentResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const { translations } = useContext(LanguageContext);

  const isSuccess = location.pathname.includes('success'); // /payment/success 랑 /payment/fail

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess) {
        navigate('/');
      } else {
        navigate(-1); // 뒤로가기
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: isSuccess ? 'success.main' : 'error.main',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isSuccess ? translations.payresult.success : translations.payresult.fail}
      </Typography>
      <Typography variant="body1">
        {isSuccess ? translations.payresult.go2home : translations.payresult.go2back}
      </Typography>
      <Box mt={4}>
        <CircularProgress color="inherit" />
      </Box>
    </Box>
  );
};

export default PaymentResultPage;