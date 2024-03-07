import React from "react";
import logo from "./logo.svg";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Top from "./page/top/Top";
import SearchDocument from "./page/search_document/SearchDocument";
import UploadDocument from "./page/upload_document/UploadDocument";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Top />} />
    //     <Route path="/search" element={<SearchDocument />} />
    //     <Route path="/upload" element={<UploadDocument />} />
    //   </Routes>
    // </Router>
    <Router>
      <div className="flex h-screen">
        {/* メニュー部分 */}
        <div className="w-1/4 bg-gray-200 p-4">
          <div className="text-2xl font-bold mb-8">メニューを選択</div>
          <div className="text-xl mb-4">
            <Link to={"/search"}>ドキュメント検索</Link>
          </div>
          <div className="text-xl">
            <Link to={"/upload"}>新規ドキュメントアップロード</Link>
          </div>
        </div>

        {/* 右側のコンテンツ部分 */}
        <div className="w-3/4 p-4">
          <Routes>
            <Route path="/search" element={<SearchDocument />} />
            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/" element={<Navigate to="/search" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
