import React, { useState, useEffect } from "react";
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
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
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
import ArtistCreate from "./pages/AdminPages/ArtistCreatePage";
import PhotoEdit from "./pages/AdminPages/PhotoEditPage";
import RegisterAdmin from "./pages/AdminPages/RegisterAdmin";
import UserEditPage from "./pages/AdminPages/UserEditPage";
import AdminEditPage from "./pages/AdminPages/AdminEditPage";
import RequireSuperUser from "./routes/RequireSuperUser";

const App = () => {
  const superUser =
    JSON.parse(sessionStorage.getItem("user"))?.userType === "super_admin";
  const token = sessionStorage.getItem("token");
  const [auth, setAuth] = useState(
    token !== null && sessionStorage.getItem("authenticate") === "true"
  );

  return (
    <LanguageProvider>
      <Routes>
        {/* 로그인 안된 유저가 접근 가능한 페이지들 */}
        <Route element={<PublicRoute authenticate={auth} />}>
          <Route
            path="login"
            element={<LoginPage setAuthenticate={setAuth} />}
          />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="find-password" element={<FindPasswordPage />} />
          <Route path="password-reset" element={<PasswordResetPage />} />
        </Route>
        {/* PrivateRoute로 넘어가ㅁ */}
        <Route element={<PrivateRoute authenticate={auth} />}>
          {/* 로그인 됐을때 user*/}
          <Route path="/" element={<Navbar setAuthenticate={setAuth} />}>
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
        {/* 관리자 페이지 */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={
              <AdminNavbar superUser={superUser} setAuthenticate={setAuth} />
            }
          >
            <Route index element={<AdminHomepage />} />
            <Route path="adminedit/:id" element={<AdminEditPage />} />
            <Route path="useredit/:id" element={<UserEditPage />} />

            {/* 슈퍼 유저 전용 */}
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

            {/* 일반 관리자 가능 */}
            <Route path="artists" element={<ArtistManage />} />
            <Route path="artistsedit" element={<ArtistCreate />} />
            <Route path="artistsedit/:id" element={<ArtistEdit />} />
            <Route path="photos" element={<PhotoManage />} />
            <Route path="photosedit" element={<PhotoEdit />} />
            <Route path="photosedit/:id" element={<PhotoEdit />} />
          </Route>
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
