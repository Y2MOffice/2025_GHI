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
import ArtistEdit from "./pages/AdminPages/ArtistEditPage";
import PhotoEdit from "./pages/AdminPages/PhotoEditPage";
import RegisterAdmin from "./pages/AdminPages/RegisterAdmin";
import UserEditPage from "./pages/AdminPages/UserEditPage";
import AdminEditPage from "./pages/AdminPages/AdminEditPage";
import RequireSuperUser from "./routes/RequireSuperUser";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false); //false>>로그인 안된거 true면 로그인 된거

  const [superUser, setSuperUser] = useState(true); //슈퍼유저 여부

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
        <Route path="/admin" element={<AdminNavbar superUser={superUser} />}>
          <Route index element={<AdminHomepage />} />
          <Route path="manage1" element={<RegisterAdmin />} />
          <Route path="adminedit" element={<AdminEditPage />} />
          <Route path="usersedit" element={<UserEditPage />} />
          <Route
            path="manage"
            element={
              <RequireSuperUser superUser={superUser}>
                <AdminManage />
              </RequireSuperUser>
            }
          />
          <Route
            path="users"
            element={
              <RequireSuperUser superUser={superUser}>
                <UserManage />
              </RequireSuperUser>
            }
          />
          <Route
            path="purchase"
            element={
              <RequireSuperUser superUser={superUser}>
                <PurchaseManage />
              </RequireSuperUser>
            }
          />
          <Route
            path="sakura"
            element={
              <RequireSuperUser superUser={superUser}>
                <SakuraManage />
              </RequireSuperUser>
            }
          />

          <Route path="artists" element={<ArtistManage />} />
          <Route path="artistsedit" element={<ArtistEdit />} />
          <Route path="photos" element={<PhotoManage />} />
          <Route path="photosedit" element={<PhotoEdit />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
