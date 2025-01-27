import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      {/* 검색했을때 결과가 나오는 페이지를 따로 만들기 위해 app.jsx에 있던 navbar+homepage기능을 
    navbar.jsx와 homepage.jsx로 분리하고 app.jsx에서는
    route설정만 하도록 변경  */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
