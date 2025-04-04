import React, { useState, useEffect, useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { pink, grey } from "@mui/material/colors";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from '@mui/icons-material/Payment';
import UserInfoTab from "../../components/Admin_component/UserInfoTab";
import LoginHistoryTab from "../../components/Admin_component/LoginHistoryTab.jsx";
import SakuraPurchaseTab from "../../components/Admin_component/SakuraPurchaseTab.jsx";
import PhotoBookPurchaseTab from "../../components/Admin_component/PhotoBookPurchaseTab.jsx";
import UserPaymentTab from "../../components/Admin_component/UserPaymentTab.jsx";

const AdminEditPage = () => {
  const { translations } = useContext(LanguageContext);
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [value, setValue] = useState(0);

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%", mt: 3 }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="admin edit tabs"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<InfoIcon />} label={translations.useredit.info} />
          <Tab icon={<PhoneIcon />} label={translations.useredit.login} />
          <Tab icon={<FavoriteIcon />} label={translations.useredit.sakura} />
          <Tab icon={<PersonPinIcon />} label={translations.useredit.photo} />
          <Tab icon={<PaymentIcon  />} label={translations.useredit.pay} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {value === 0 && <UserInfoTab userId={id} />}
        {value === 1 && <LoginHistoryTab userId={id} />}
        {value === 2 && <SakuraPurchaseTab userId={id} />}
        {value === 3 && <PhotoBookPurchaseTab userId={id} />}
        {value === 4 && <UserPaymentTab userId={id} />}
      </Box>
    </Container>
  );
};

export default AdminEditPage;
