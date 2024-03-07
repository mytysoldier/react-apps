import { useState } from "react";
import { search_document } from "../../api/search_document";
import { SearchDocumentResponse } from "../../api/model/model";
import SearchResult from "../../component/search_document/SearchResult";

function SearchDocument() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] =
    useState<SearchDocumentResponse | null>(null);

  const handleSearch = async () => {
    const result = await search_document(searchText);
    console.log(`search result: ${JSON.stringify(result)}`);
    setSearchResult(result);
  };

  return (
    <div className="h-screen flex flex-col items-center pt-2">
      <div className="text-3xl font-bold mb-8">ドキュメント検索</div>
      <div className="flex justify-center w-full">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg w-2/4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          検索
        </button>
      </div>
      {/* 検索結果を表示 */}
      {searchResult && <SearchResult data={searchResult} />}
    </div>
  );
}

export default SearchDocument;
