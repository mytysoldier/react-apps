import { UserSearchForm } from "@/components/user_list/user_search_form";
import { UserSearchResult } from "@/components/user_list/user_search_result";
import { User } from "@/types/user";
import { useState } from "react";

export default function UserList() {
  // ユーザー検索結果
  const [users, setUsers] = useState<User[]>([]);

  // ユーザー一覧検索
  const handleSearchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users");
      const jsonData: any[] = JSON.parse(await response.json());
      // レスポンスデータをマッピング
      const userDatas: User[] = jsonData.map((user) => {
        const { _id, ...rest } = user;
        return { id: _id["$oid"], ...rest };
      });
      // 一覧を更新
      setUsers(userDatas);
    } catch (e) {
      console.error("APIリクエストエラー:", e);
    }
  };

  return (
    <>
      <h1>ユーザー管理</h1>
      <UserSearchForm onClickSearch={handleSearchUser} />
      <UserSearchResult users={users} />
    </>
  );
}
