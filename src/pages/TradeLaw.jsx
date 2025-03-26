import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import logo from "../assets/ABCDE.png";

const LawDisplay = () => {
  return (
    <Box sx={{ bgcolor: "black", py: 0 }}>
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          px: { xs: 3, sm: 6, md: 8 },
          py: 5,
          borderRadius: 1,
          width: "85%",
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
        特定商取引法に基づく表示
        </Typography>
        <Box component="ul" sx={{ pl: 2, mt: 2 }}>
          <li>
            <Typography
              component="div"
              sx={{
                whiteSpace: "pre-line",
                textAlign: "left",
                fontSize: "0.95rem",
                lineHeight: 1.9,
                fontWeight: "bold"
              }}
            >
              販売業者名
            </Typography>
            <Typography>
            株式会社ワイ・ツー・エム
              <br />
              代表取締役　呉 榮澤<br />
              〒124-0025
              <br />
              東京都葛飾区西新小岩三丁目32番7号
              <br />
              メールアドレス：contact@y2m.jp
            </Typography>
          </li>
        </Box>
      </Box>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", pt: 6, pb: 4, px: 4 }}>
      <Box display="flex" justifyContent="center" mb={5}>
      <img src={logo} style={{ height: "40px" }} />
      </Box>

      <Grid container spacing={8} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography mb={4}>ご利用方法</Typography>
          <Typography mb={4}>FAQ</Typography>
          <Typography mb={1}>事前予約</Typography>
          <Typography>キャンセルポリシー</Typography>
          <Typography mb={20}>及び返金について</Typography>
          <Typography mb={4}>利用規約</Typography>
          <Typography mb={4}>プライバシーポリシー</Typography>
          <Typography mb={10}>特定商取引法表示</Typography>
          <Box mt={2}>
            <Typography variant="caption">　　© GLOWSNAPS TOKYO 2025</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography mb={5}>TOP</Typography>
          <Typography mb={5}>NEWS</Typography>
          <Typography mb={5}>運営会社</Typography>
          <Typography mb={5}>アクセス</Typography>
          <Typography mb={7}>お問い合わせ</Typography>

          <Box display="flex" gap={1} mt={2}>
            <IconButton color="inherit" size="small">
              <XIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Page = () => {
  return (
    <div>
      <LawDisplay />
      <Footer />
    </div>
  );
};

export default Page;
