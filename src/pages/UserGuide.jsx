import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserGuide = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Box sx={{ maxWidth: "800px", width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          사쿠라 이용 가이드
        </Typography>

        {[
          {
            title: "1. 사쿠라 시작하기",
            content: (
              <>
                - <strong>회원가입</strong>: 메인 페이지의 [회원가입] 버튼을
                클릭하여 이메일과 비밀번호를 입력하신 후, 전송된 인증 메일을
                확인하시면 가입이 완료됩니다.
                <br />- <strong>로그인</strong>: [로그인] 버튼을 통해 등록된
                계정으로 접속하실 수 있으며, 이후 모든 서비스를 이용하실 수
                있습니다.
              </>
            ),
          },
          {
            title: "2. 전용 코인 구매 안내",
            content: (
              <>
                본 플랫폼은 사진집 구매 시 전용 코인 사용을 원칙으로 합니다.
                <br />- <strong>구매 방법</strong>: 상단 메뉴의 [코인 구매]
                버튼을 클릭하여 원하는 금액을 선택한 뒤, 결제를 진행해 주세요.
                Stripe를 통한 안전한 카드 결제를 지원합니다.
                <br />- <strong>확인</strong>: 결제 완료 후 코인은 즉시
                충전되며, [마이페이지 &gt; 코인 내역]에서 확인 가능합니다.
              </>
            ),
          },
          {
            title: "3. 사진집 검색 방법",
            content: (
              <>
                - 검색창에 작가명, 사진집 제목 또는 태그를 입력하시면 관련
                사진집을 확인하실 수 있습니다.
                <br />- 예: "IU", "아이유 앨범", "#아이유"
              </>
            ),
          },
          {
            title: "4. 사진집 상세 페이지 안내",
            content: (
              <>
                사진집을 클릭하면 상세 페이지로 이동합니다.
                <br />- <strong>표시 정보</strong>: 가격, 설명, 작가 정보,
                미리보기 이미지 등 다양한 정보를 확인하실 수 있습니다.
              </>
            ),
          },
          {
            title: "5. 사진집 구매 방법",
            content: (
              <>
                - 상세 페이지에서 [구매하기] 버튼을 클릭하면 구매가 진행됩니다.
                <br />- 코인이 부족한 경우, 자동으로 [코인 구매] 페이지로
                이동합니다.
                <br />- 구매한 사진집은 [마이페이지 &gt; 구매 내역]에서 언제든
                열람 가능합니다.
              </>
            ),
          },
          {
            title: "6. 구매 내역 확인",
            content: (
              <>
                - [마이페이지]의 [구매 내역] 탭에서 이전에 구매한 모든 사진집을
                확인할 수 있습니다.
                <br />- 일부 사진집은 다운로드 또는 열람 방식으로 제공됩니다.
              </>
            ),
          },
          {
            title: "7. 결제 수단 및 환불 정책",
            content: (
              <>
                - <strong>결제 수단</strong>: Stripe를 통한 Visa, Mastercard 등
                주요 신용카드 결제를 지원합니다.
                <br />- <strong>환불 정책</strong>: 결제일로부터 7일 이내이며,
                열람 또는 다운로드하지 않은 사진집에 한해 환불이 가능합니다.
                환불은 [마이페이지 &gt; 고객 지원]을 통해 신청하실 수 있습니다.
              </>
            ),
          },
          {
            title: "8. 자주 묻는 질문 (FAQ)",
            content: (
              <>
                - <strong>Q. 코인이 부족한 경우?</strong>
                <br />
                A. 언제든 [코인 구매] 페이지에서 충전하실 수 있습니다.
                <br />-{" "}
                <strong>Q. 실수로 사진집을 구매했는데 환불 가능한가요?</strong>
                <br />
                A. 열람 전이며, 결제 후 7일 이내인 경우 환불이 가능합니다.
                <br />-{" "}
                <strong>
                  Q. 샘플 이미지가 마음에 들지 않으면 환불 가능한가요?
                </strong>
                <br />
                A. 샘플 이미지 제공은 참고용이며, 구매 후 환불은 제한될 수
                있습니다. 신중히 선택해 주세요.
                <br />- 추가 문의는 [support@sakura.com]으로 연락해 주세요.
              </>
            ),
          },
        ].map(({ title, content }, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              backgroundColor: "background.paper",
              color: "text.primary",
              mb: 2,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "text.secondary" }} />}
            >
              <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default UserGuide;
