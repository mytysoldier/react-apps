import { UserStatus, UserType } from "@/types/user";
import React, { useState } from "react";
import { Button } from "../common/button";
import { userStatusItems, userTypeItems } from "@/constant/constant";

type Props = {
  onClickSearch: () => void;
};

export const UserSearchForm: React.FC<Props> = ({ onClickSearch }) => {
  // ユーザーIDでの検索パラメーター保持用
  const [userId, setUserId] = useState("");
  // ユーザー種別での検索パラメーター保持用
  const [userType, setUserType] = useState<UserType | "全件検索">("全件検索");
  // ユーザー状態での検索パラメーター保持用
  const [userStatus, setUserStatus] = useState<UserStatus | "全件検索">(
    "全件検索"
  );

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
        <div className="py-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border rounded w-full px-4 py-2"
            placeholder="xxxx"
          />
        </div>
      </div>

      <div className="flex gap-6 py-4">
        <div className="flex-auto">
          <h3>ユーザー種別</h3>
          <div className="py-2">
            <select
              value={userType}
              onChange={handleUserTypeSelected}
              className="border rounded px-4 py-2 w-full"
            >
              {userTypeItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-auto">
          <h3>ユーザーの状態</h3>
          <div className="py-2">
            <select
              value={userStatus}
              onChange={handleUserStatusSelected}
              className="border rounded px-4 py-2 w-full"
            >
              {userStatusItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button text="検索" onClick={onClickSearch} />
      </div>
    </>
  );
};
