import { userStatusItems, userTypeItems } from "@/constant/constant";
import { User, UserStatus, UserType } from "@/types/user";
import Link from "next/link";
import { useState } from "react";

export default function UserAdd() {
  // 画面上の更新可能項目
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState<UserType>("一般");
  const [userStatus, setUserStatus] = useState<UserStatus>("有効");

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

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          type: userType,
          status: userStatus,
        } as User),
      });

      if (response.status == 200) {
        alert("データが登録されました。");
      } else {
        console.error(`ユーザーデータ登録失敗: statusCode: ${response.status}`);
      }
    } catch (e) {
      console.error("APIリクエストエラー:", e);
    }
  };

  return (
    <>
      <h1>ユーザー追加</h1>
      <div>
        <table>
          <tbody>
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
              <td>
                <select value={userStatus} onChange={handleUserStatusSelected}>
                  {userStatusItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleSubmit}>登録</button>
      </div>
      <h2>
        <Link href="/">戻る</Link>
      </h2>
    </>
  );
}
