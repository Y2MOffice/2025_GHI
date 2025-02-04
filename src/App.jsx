import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import SearchPage from "./SearchPage";
import MyPage from "./MyPage";
import EditAcount from "./EditAcountPage";
import Navbar from "./components/Navbar";
import SignUpComplete from "./SignUpComplete";
import LoginPage from "./LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SignUpPage from "./SignUpPage";
import FindPasswordPage from "./FindPasswordPage";
import NotFoundPage from "./NotFoundPage";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false); //false>>로그인 안된거 true면 로그인 된거

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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
