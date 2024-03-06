import React from "react";
import { SearchDocumentResponse } from "../../api/model/model";

interface Props {
  data: SearchDocumentResponse;
}
const SearchResult: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-lg font-bold mb-4">
        {data.count}件ヒットしました。
      </div>
      <div className="text-sm">
        <div className="mb-2">検索結果：</div>
        <ul>
          {data.result.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="font-bold">ファイル名：{item.file_name}</div>
              <div className="mt-2">
                {item.text.length > 200
                  ? `${item.text.slice(0, 200)}...`
                  : item.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResult;
