import { Button } from "@/components/common/button";
import {
  allSearchItem,
  userStatusItems,
  userTypeItems,
} from "@/constant/constant";
import { User, UserStatus, UserType } from "@/types/user";
import Link from "next/link";
import router from "next/router";
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
    if (userName === "") {
      alert("ユーザー名を入力してください。");
      return;
    }
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
        // ホームに戻す
        router.push("/");
      } else {
        console.error(`ユーザーデータ登録失敗: statusCode: ${response.status}`);
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
            <div className="text-lg">ユーザー追加</div>
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
                  <td className="bg-slate-300">ユーザー名</td>
                  <td className="h-full">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border-none w-full h-14"
                      placeholder="名前を入力してください"
                    />
                  </td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザー種別</td>
                  <td>
                    <select value={userType} onChange={handleUserTypeSelected}>
                      {userTypeItems
                        .filter((item) => item !== allSearchItem)
                        .map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ステータス</td>
                  <td>
                    <select
                      value={userStatus}
                      onChange={handleUserStatusSelected}
                    >
                      {userStatusItems
                        .filter((item) => item !== allSearchItem)
                        .map((item, index) => (
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

          <div className="flex justify-end">
            <Button text="登録" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
