import { userStatusItems, userTypeItems } from "@/constant/constant";
import { User, UserStatus, UserType } from "@/types/user";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  user?: User | null;
};

// user_idをキーにユーザーデータを非同期取得
const getData = async (user_id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user?id=${user_id}`);
    const responseData = await response.json();

    if (responseData) {
      // レスポンスがnullでなければUser型に変換
      const { _id, ...rest } = JSON.parse(responseData);
      const user: User = { id: _id.$oid, ...rest };
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.error("APIリクエストエラー:", e);
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;
  const { id } = query;

  // データを取得
  const user = await getData(id as string);

  return {
    props: {
      user: user || null,
    },
  };
};

const UserEdit: React.FC<Props> = ({ user }) => {
  if (!user) {
    return (
      <>
        <div>ユーザーが見つかりません。</div>
        <div>
          <Link href="/user_detail/user_edit">
            <button>編集</button>
          </Link>
        </div>
      </>
    );
  }

  // 画面上の更新可能項目
  const [userName, setUserName] = useState(user.name);
  const [userType, setUserType] = useState(user.type);
  const [userStatus, setUserStatus] = useState(user.status);

  const handleUserTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserType = e.target.value as UserType;
    setUserType(selectedUserType);
  };

  const handleUserStatusSelected = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedUserStatus = e.target.value as UserStatus;
    setUserStatus(selectedUserStatus);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: userName,
          type: userType,
          status: userStatus,
        } as User),
      });

      if (response.status == 200) {
        alert("データが更新されました。");
      } else {
        console.error(`ユーザーデータ更新失敗: statusCode: ${response.status}`);
      }
    } catch (e) {
      console.error("APIリクエストエラー:", e);
    }
  };

  const handleDeleteUser = async (user_id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user?id=${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        alert("データが削除されました。");
      } else {
        console.error(`ユーザーデータ更新失敗: statusCode: ${response.status}`);
      }
    } catch (e) {
      console.error("APIリクエストエラー:", e);
    }
  };

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
              <td>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border w-full"
                />
              </td>
            </tr>
            <tr>
              <td>ユーザー種別</td>
              <td>
                <select value={userType} onChange={handleUserTypeSelected}>
                  {userTypeItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>ステータス</td>
              <select value={userStatus} onChange={handleUserStatusSelected}>
                {userStatusItems.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button onClick={() => handleDeleteUser(user.id)}>削除</button>
        <button onClick={handleUpdateUser}>更新</button>
      </div>

      <h2>
        <Link href="/">戻る</Link>
      </h2>
    </>
  );
};

export default UserEdit;
