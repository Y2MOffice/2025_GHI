import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import PointHistory from "./pages/PointHistory";
import PhotoPurchaseHistory from "./pages/PhotoPurchaseHistory";
import FavoriteList from "./pages/FavoriteList";
import EditAccount from "./pages/EditAcountPage";
import Navbar from "./components/Navbar";
import SignUpComplete from "./pages/SignUpComplete";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SignUpPage from "./pages/SignUpPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TradeLaw from "./pages/TradeLaw";
import UserGuide from "./pages/UserGuide";
import ViewPage from "./pages/viewPage(list)";
import MyPage from "./pages/MyPage";
import AdminNavbar from "./components/Admin_component/AdminNavbar";
import AdminManage from "./pages/AdminPages/AdminManagePage";
import UserManage from "./pages/AdminPages/UserManagePage";
import ArtistManage from "./pages/AdminPages/ArtistManagePage";
import PhotoManage from "./pages/AdminPages/PhotoManagePage";
import PurchaseManage from "./pages/AdminPages/PurchaseManagePage";
import SakuraManage from "./pages/AdminPages/SakuraManagePage";
import AdminHomepage from "./pages/AdminPages/AdminHomepage";
import RegisterAdmin from "./pages/AdminPages/RegisterAdmin";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false); //false>>로그인 안된거 true면 로그인 된거

  return (
    <LanguageProvider>
      <Routes>
        {/* 로그인 안된 유저가 접근 가능한 페이지들 */}
        <Route
          path="login"
          element={<LoginPage setAuthenticate={setAuthenticate} />}
        />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="find-password" element={<FindPasswordPage />} />
        <Route path="password-reset" element={<PasswordResetPage />} />
        {/* PrivateRoute로 넘어가ㅁ */}
        <Route element={<PrivateRoute authenticate={authenticate} />}>
          {/* 로그인 됐을때 user*/}
          <Route
            path="/"
            element={<Navbar setAuthenticate={setAuthenticate} />}
          >
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="trade-law" element={<TradeLaw />} />
            <Route path="user-guide" element={<UserGuide />} />
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="edit_account" element={<EditAccount />} />
            <Route path="SignUpComplete" element={<SignUpComplete />} />
            <Route path="point-history" element={<PointHistory />} />
            <Route path="photo-history" element={<PhotoPurchaseHistory />} />
            <Route path="favorites" element={<FavoriteList />} />
            <Route path="viewPage/:id" element={<ViewPage />} />
          </Route>
        </Route>
        {/* admin페이지 */}
        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<AdminHomepage />} />
          <Route path="manage" element={<AdminManage />} />
          <Route path="manage1" element={<RegisterAdmin />} />
          <Route path="users" element={<UserManage />} />
          <Route path="artists" element={<ArtistManage />} />
          <Route path="photos" element={<PhotoManage />} />
          <Route path="purchase" element={<PurchaseManage />} />
          <Route path="sakura" element={<SakuraManage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
