import { UserSearchForm } from "@/components/user_list/user_search_form";
import { UserSearchResult } from "@/components/user_list/user_search_result";
import { User } from "@/types/user";
import { useState } from "react";

export default function UserList() {
  // ユーザー検索結果
  const [users, setUsers] = useState<User[]>([]);

  const handleUserSearch = () => {
    const dummyData: User[] = [
      { id: "1", name: "John Doe", type: "一般", status: "有効" },
      { id: "2", name: "Jane Smith", type: "一般", status: "有効" },
      { id: "3", name: "Bob Johnson", type: "一般", status: "有効" },
    ];
    setUsers(dummyData);
  };

  return (
    <>
      <h1>ユーザー管理</h1>
      <UserSearchForm onClickSearch={handleUserSearch} />
      <UserSearchResult users={users} />
    </>
  );
}
