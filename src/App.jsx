import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import SearchPage from "./SearchPage";
import Navbar from "./components/Navbar";
import SignUpComplete from "./SignUpComplete";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="SignUpComplete" element={<SignUpComplete />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
