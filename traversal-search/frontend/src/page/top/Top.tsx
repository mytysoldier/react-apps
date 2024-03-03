import { Link } from "react-router-dom";

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
  );
}

export default Top;
