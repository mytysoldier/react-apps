import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchDocument from "../search_document/SearchDocument";
import UploadDocument from "../upload_document/UploadDocument";

function Top() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-bold mb-8">メニューを選択</div>
        <div className="text-xl mb-4">
          <Link to={"/search"}>ドキュメント検索</Link>
        </div>
        <div className="text-xl">
          <Link to={"/upload"}>新規ドキュメントアップロード</Link>
        </div>
      </div>
    </>
    // <Router>
    //   <div className="flex h-screen">
    //     {/* メニュー部分 */}
    //     <div className="w-1/4 bg-gray-200 p-4">
    //       <div className="text-3xl font-bold mb-8">メニューを選択</div>
    //       <div className="text-xl mb-4">
    //         <Link to={"/search"}>ドキュメント検索</Link>
    //       </div>
    //       <div className="text-xl">
    //         <Link to={"/upload"}>新規ドキュメントアップロード</Link>
    //       </div>
    //     </div>

    //     {/* 右側のコンテンツ部分 */}
    //     <div className="w-3/4 p-4">
    //       <Routes>
    //         {/* <Route path="/" element={<Top />} /> */}
    //         <Route path="/search" element={<SearchDocument />} />
    //         <Route path="/upload" element={<UploadDocument />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default Top;
