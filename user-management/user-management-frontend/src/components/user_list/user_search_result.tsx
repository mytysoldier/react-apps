import { User } from "@/types/user";
import Link from "next/link";
import React from "react";

type Props = {
  users: User[];
};

export const UserSearchResult: React.FC<Props> = ({ users }) => {
  const tableHeaderClass = "border-b border-slate-400";
  return (
    <>
      <div className="text-lg">ユーザー検索結果</div>
      <div className="py-4">
        <table className="table-auto border-separate border-spacing-4 border border-slate-300">
          <thead className="border">
            <tr>
              <th className={tableHeaderClass}>ユーザーID</th>
              <th className={tableHeaderClass}>ユーザー名</th>
              <th className={tableHeaderClass}>ユーザータイプ</th>
              <th className={tableHeaderClass}>ステータス</th>
              <th className={tableHeaderClass}>アクション</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.type}</td>
                <td>{user.status}</td>
                <td>
                  <Link href={`/user_detail/user_detail?id=${user.id}`}>
                    ユーザーデータを見る
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
