import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import SearchPage from "./SearchPage";
import PointHistory from "./PointHistory";
import PhotoPurchaseHistory from "./PhotoPurchaseHistory";
import FavoriteList from "./FavoriteList";
import EditAcount from "./EditAcountPage";
import Navbar from "./components/Navbar";
import SignUpComplete from "./SignUpComplete";
import LoginPage from "./LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SignUpPage from "./SignUpPage";
import FindPasswordPage from "./FindPasswordPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TradeLaw from "./TradeLaw";
import UserGuide from "./UserGuide";

const App = () => {
  const [authenticate, setAuthenticate] = useState(true); //false>>로그인 안된거 true면 로그인 된거

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar authenticate={authenticate} />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="mypage"
            element={<PrivateRoute authenticate={authenticate} />}
          />
          <Route path="edit_account" element={<EditAcount />} />
          <Route path="SignUpComplete" element={<SignUpComplete />} />
          <Route
            path="login"
            element={<LoginPage setAuthenticate={setAuthenticate} />}
          />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="find-password" element={<FindPasswordPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="trade-law" element={<TradeLaw />} />
          <Route path="user-guide" element={<UserGuide />} />
          <Route path="point-history" element={<PointHistory />} />
          <Route path="photo-history" element={<PhotoPurchaseHistory />} />
          <Route path="favorites" element={<FavoriteList />} />
          <Route path="point-history" element={<PointHistory />} />
          <Route path="photo-history" element={<PhotoPurchaseHistory />} />
          <Route path="favorites" element={<FavoriteList />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
