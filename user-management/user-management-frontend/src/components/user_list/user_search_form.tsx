import { UserStatus, UserType } from "@/types/user";
import React, { useId, useState } from "react";

export const UserSearchForm = () => {
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
      <h2>ユーザー管理</h2>
      <h3>ユーザーID</h3>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <h3>ユーザー種別</h3>
      <select value={userType} onChange={handleUserTypeSelected}>
        <option value="">全件検索</option>
        {userTypeItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <h3>ユーザーの状態</h3>
      <select value={userStatus} onChange={handleUserStatusSelected}>
        <option value="">全件検索</option>
        {userStatusItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={() => {}}>検索</button>
    </>
  );
};
