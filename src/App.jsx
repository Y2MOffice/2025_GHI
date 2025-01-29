import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import SearchPage from "./SearchPage";
import Navbar from "./components/Navbar";
import SignUpComplete from "./SignUpComplete";
import LoginPage from "./LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import SignUpPage from "./SignUpPage";

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
          <Route path="SignUpComplete" element={<SignUpComplete />} />
          <Route
            path="login"
            element={<LoginPage setAuthenticate={setAuthenticate} />}
          />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
