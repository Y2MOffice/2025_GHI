import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import SearchPage from "./SearchPage";
import MyPage from "./MyPage";
import EditAcount from "./EditAcountPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="edit_account" element={<EditAcount />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
