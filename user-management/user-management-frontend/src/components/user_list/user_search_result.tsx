import { User } from "@/types/user";
import Link from "next/link";
import React from "react";

type Props = {
  users: User[];
};

export const UserSearchResult: React.FC<Props> = ({ users }) => {
  return (
    <>
      <h1>結果</h1>
      <table>
        <thead>
          <tr>
            <th>ユーザーID</th>
            <th>ユーザー名</th>
            <th>ユーザータイプ</th>
            <th>ステータス</th>
            <th>アクション</th>
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
    </>
  );
};
