import { Button } from "@/components/common/button";
import { userStatusItems, userTypeItems } from "@/constant/constant";
import { User, UserStatus, UserType } from "@/types/user";
import { GetServerSideProps } from "next";
import Link from "next/link";
import router from "next/router";
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
    if (
      userName === user.name &&
      userType === user.type &&
      userStatus === user.status
    ) {
      // 何も変更していなければ、アラート表示
      alert("データに変更がありません。");
      return;
    }
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
        // ホームに戻す
        router.push("/");
      } else {
        console.error(`ユーザーデータ更新失敗: statusCode: ${response.status}`);
      }
    } catch (e) {
      console.error("APIリクエストエラー:", e);
    }
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="grid">
        <div className="w-4/5 bg-white rounded place-self-center px-4 py-4">
          <div className="flex justify-between pb-4 border-b-2">
            <div className="text-lg">ユーザー編集</div>
            <div>
              <Link href="/">
                <Button text="戻る" onClick={() => {}} />
              </Link>
            </div>
          </div>
          <div className="py-4">
            <table className="table-auto border border-slate-300 w-full">
              <tbody>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザーID</td>
                  <td>{user.id}</td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザー名</td>
                  <td>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full h-14"
                    />
                  </td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザー種別</td>
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
                <tr className="h-14">
                  <td className="bg-slate-300">ステータス</td>
                  <select
                    value={userStatus}
                    onChange={handleUserStatusSelected}
                  >
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

          <div className="flex justify-end gap-2">
            <div>
              <Button text="削除" onClick={() => handleDeleteUser(user.id)} />
            </div>
            <div>
              <Button text="更新" onClick={handleUpdateUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
