import { Button } from "@/components/common/button";
import { UserSearchForm } from "@/components/user_list/user_search_form";
import { UserSearchResult } from "@/components/user_list/user_search_result";
import { allSearchItem } from "@/constant/constant";
import { User } from "@/types/user";
import Link from "next/link";
import { useState } from "react";

export default function UserList() {
  // ユーザー検索結果
  const [users, setUsers] = useState<User[]>([]);

  // ユーザー一覧検索
  const handleSearchUser = async (
    userName: string,
    userType: string,
    userStatus: string
  ) => {
    // クエリーパラメーターの構築
    let queryParam = "?";
    if (userName !== "") {
      queryParam = queryParam.concat(`name=${userName}`);
    }
    if (userType !== allSearchItem) {
      queryParam = queryParam.concat(`&type=${userType}`);
    }
    if (userStatus !== allSearchItem) {
      queryParam = queryParam.concat(`&status=${userStatus}`);
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/users${queryParam}`);
      const jsonData: any[] = JSON.parse(await response.json());
      // レスポンスデータをマッピング
      const userDatas: User[] = jsonData.map((user) => {
        const { _id, ...rest } = user;
        return { id: _id["$oid"], ...rest };
      });
      // 一覧を更新
      setUsers(userDatas);
    } catch (e) {}
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="grid">
        <div className="w-4/5 bg-white rounded place-self-center px-4 py-4">
          <div className="flex justify-between pb-4 border-b-2">
            <div className="text-lg">ユーザー管理</div>
            <div>
              <Link href="/user_add/user_add">
                <Button text="ユーザー追加" onClick={() => {}} />
              </Link>
            </div>
          </div>
          <UserSearchForm onClickSearch={handleSearchUser} />
        </div>
        {users.length != 0 ? (
          <div className="mt-8 w-4/5 bg-white rounded place-self-center px-4 py-4">
            <UserSearchResult users={users} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
