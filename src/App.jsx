import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import AdminNavbar from "./components/AdminNavbar";
import AdminManage from "./components/AdminManage";
import UserManage from "./components/UserManage";
import ArtistManage from "./components/ArtistManage";
import PhotoManage from "./components/PhotoManage";
import PurchaseManage from "./components/PurchaseManage";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false); //false>>로그인 안된거 true면 로그인 된거

  return (
    <>
      <Routes>
        {/* 로그인 안된 유저가 접근 가능한 페이지들 */}
        <Route
          path="login"
          element={<LoginPage setAuthenticate={setAuthenticate} />}
        />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="find-password" element={<FindPasswordPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="trade-law" element={<TradeLaw />} />
        <Route path="user-guide" element={<UserGuide />} />
        <Route path="password-reset" element={<PasswordResetPage />} />
        {/* PrivateRoute로 넘어가ㅁ */}
        <Route element={<PrivateRoute authenticate={authenticate} />}>
          {/* 로그인 됐을때 */}
          <Route
            path="/"
            element={<Navbar setAuthenticate={setAuthenticate} />}
          >
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
        {/* <Route>admin페이지(추후)</Route> */}
        <Route
          path="/admin/*"
          element={
            <div style={{ display: "flex" }}>
              <AdminNavbar />
              <div style={{ flexGrow: 1, padding: "20px" }}>
                <Routes>
                  <Route path="manage" element={<AdminManage />} />
                  <Route path="users" element={<UserManage />} />
                  <Route path="artists" element={<ArtistManage />} />
                  <Route path="photos" element={<PhotoManage />} />
                  <Route path="purchase" element={<PurchaseManage />} />
                </Routes>
              </div>
            </div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
