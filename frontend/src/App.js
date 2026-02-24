import React from "react";
import Home from "./Home";
import Header from "./header";
import Info from "./Info";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
