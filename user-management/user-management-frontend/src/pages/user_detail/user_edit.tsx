import { User } from "@/types/user";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  user: User;
};

// ダミーデータの非同期取得
const getData = async () => {
  // 仮に非同期処理をここで実行し、データを取得するとします
  // この例ではダミーデータを返す
  const dummyData: User[] = [
    { id: "1", name: "John Doe", type: "一般", status: "有効" },
    { id: "2", name: "Jane Smith", type: "一般", status: "有効" },
    { id: "3", name: "Bob Johnson", type: "一般", status: "有効" },
  ];
  return dummyData[0];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // データを取得
  const user = await getData();

  return {
    props: {
      user,
    },
  };
};

const UserEdit: React.FC<Props> = ({ user }) => {
  return (
    <>
      <h2>ユーザー編集</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>ユーザーID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>ユーザー名</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>ユーザー種別</td>
              <td>{user.type}</td>
            </tr>
            <tr>
              <td>ステータス</td>
              <td>{user.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button>削除</button>
        <button>更新</button>
      </div>

      <h2>
        <Link href="/">戻る</Link>
      </h2>
    </>
  );
};

export default UserEdit;
