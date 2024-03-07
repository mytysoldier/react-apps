import { SearchDocumentResponse } from "./model/model";

export async function search_document(
  text: string
): Promise<SearchDocumentResponse> {
  try {
    // HTTP GETリクエストを送信し、サーバーからのレスポンスを取得する
    const response = await fetch(`http://localhost:8000/search?text=${text}`);

    // サーバーからのレスポンスが正常でない場合は例外をスローする
    if (!response.ok) {
      throw new Error(
        `Failed to fetch documents (${response.status} ${response.statusText})`
      );
    }

    // サーバーからのレスポンスデータをJSON形式で取得する
    const responseData = await response.json();

    // サーバーからのレスポンスデータをSearchDocumentResponse型にマッピングして返す
    return {
      count: responseData.count,
      result: responseData.result,
    };
  } catch (error) {
    // エラーが発生した場合の処理
    console.error("Error searching documents:", error);

    // 空のSearchDocumentResponseインスタンスを返す
    return {
      count: 0,
      result: [],
    };
  }
}
