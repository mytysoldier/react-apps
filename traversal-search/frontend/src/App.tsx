import React from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Top from "./page/top/Top";
import SearchDocument from "./page/search_document/SearchDocument";
import UploadDocument from "./page/upload_document/UploadDocument";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/search" element={<SearchDocument />} />
        <Route path="/upload" element={<UploadDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
