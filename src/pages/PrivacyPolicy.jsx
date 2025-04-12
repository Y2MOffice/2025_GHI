import React from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sections = [
  {
    title: "1. 수집하는 개인정보 항목",
    content: `회원가입 및 서비스 이용 시 다음과 같은 정보를 수집할 수 있습니다:
- 이메일 주소, 비밀번호
- 로그인 이력 및 접속 IP, 디바이스 정보
- 결제 시 필요한 최소한의 결제 정보 (제3자 결제 서비스에 위임)`,
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    content: `- 회원 식별 및 서비스 제공
- 사진집 구매 및 열람 기능 제공
- 결제 이력 확인 및 고객 지원
- 불법 행위 방지를 위한 보안 관리`,
  },
  {
    title: "3. 개인정보 보유 및 이용 기간",
    content: `회원 탈퇴 시, 관련 법령에 따라 일정 기간 보관이 필요한 정보를 제외한 모든 개인정보는 즉시 파기됩니다.`,
  },
  {
    title: "4. 개인정보의 제3자 제공",
    content: `회사는 이용자의 개인정보를 외부에 제공하지 않으며, 다음의 경우에만 예외로 합니다:
- 이용자가 사전에 동의한 경우
- 법령에 따라 요청받은 경우`,
  },
  {
    title: "5. 개인정보의 처리 위탁",
    content: `서비스 제공을 위해 외부 업체에 일부 처리를 위탁할 수 있으며, 위탁 계약을 통해 개인정보 보호를 철저히 관리합니다.`,
  },
  {
    title: "6. 이용자의 권리",
    content: `이용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제 요청할 수 있으며 회원 탈퇴도 가능합니다.`,
  },
  {
    title: "7. 개인정보 보호책임자",
    content: `- 이메일: support@glowsnaps.tokyo`,
  },
  {
    title: "8. 정책 변경에 대한 고지",
    content: `본 개인정보처리방침은 변경될 수 있으며, 변경 시 웹사이트를 통해 공지됩니다.`,
  },
];

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          개인정보처리방침
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          본 방침은 glowsnaps에서 제공하는 서비스 이용자들의 개인정보 보호를
          위한 내용을 담고 있습니다.
        </Typography>
      </Box>

      {sections.map((section, index) => (
        <Accordion
          key={index}
          sx={{ mb: 2, backgroundColor: "background.paper" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.content.split("\n").map((line, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{ whiteSpace: "pre-line", mb: 1 }}
              >
                {line.trim()}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography
        variant="caption"
        display="block"
        textAlign="right"
        mt={4}
        color="text.secondary"
      >
        시행일자: 2025년 4월 6일
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
