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
                  <Link
                    href={`/user_detail/user_detail?id=${user.id}`}
                    className="text-blue-500"
                  >
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>ユーザーデータを見る</div>
                    </div>
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
