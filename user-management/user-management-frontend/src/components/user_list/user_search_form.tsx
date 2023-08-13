import { UserStatus, UserType } from "@/types/user";
import React, { useState } from "react";
import { Button } from "../common/button";

type Props = {
  onClickSearch: () => void;
};

export const UserSearchForm: React.FC<Props> = ({ onClickSearch }) => {
  // ユーザーIDでの検索パラメーター保持用
  const [userId, setUserId] = useState("");
  // ユーザー種別での検索パラメーター保持用
  const [userType, setUserType] = useState<UserType>("一般");
  // ユーザー状態での検索パラメーター保持用
  const [userStatus, setUserStatus] = useState<UserStatus>("有効");

  // ユーザー種別プルダウンリストのアイテム一覧
  const userTypeItems = ["一般", "管理者"];
  // ユーザー状態プルダウンリストのアイテム一覧
  const userStatusItems = ["有効", "無効"];

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

  return (
    <>
      <div className="py-4">
        <h3>ユーザーID</h3>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border w-full"
        />
      </div>

      <div className="flex gap-6 py-4">
        <div>
          <h3>ユーザー種別</h3>
          <select value={userType} onChange={handleUserTypeSelected}>
            <option value="">全件検索</option>
            {userTypeItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>ユーザーの状態</h3>
          <select value={userStatus} onChange={handleUserStatusSelected}>
            <option value="">全件検索</option>
            {userStatusItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button text="検索" onClick={onClickSearch} />
      </div>
    </>
  );
};
