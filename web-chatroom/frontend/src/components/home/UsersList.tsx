import { useState } from "react";
import { userIconMap } from "../../constant/Constant";

function UsersList({ onSelectUser }: { onSelectUser: (name: string) => void }) {
  // ユーザーデータの配列
  const usersData = [
    { id: "1", name: "John", intro: "I'm a doctor." },
    { id: "2", name: "Ninja", intro: "I'm a ninja." },
    { id: "3", name: "Ojisan", intro: "I'm an ojisan." },
    { id: "4", name: "Alice", intro: "I'm an operator." },
    { id: "5", name: "Taisyo", intro: "I'm a taisyo." },
    { id: "6", name: "Wrestler", intro: "I'm a wrestler." },
  ];

  // 選択状態
  const [selectedUser, setSelectedUser] = useState<string>("");

  // ユーザーがクリックされたときのハンドラー関数
  const handleUserClick = (userId: string) => {
    {
      setSelectedUser(selectedUser === userId ? "" : userId);
    }
  };

  return (
    <div className="flex flex-wrap">
      {usersData.map(
        (
          user // 最初の6行のみ表示する
        ) => (
          <div key={user.id} className="w-full p-2">
            {" "}
            {/* カードのレスポンシブデザイン */}
            <div
              className={`bg-gray-100 p-4 rounded-lg shadow-md flex items-center cursor-pointer ${
                selectedUser === user.id ? "border border-red-500" : ""
              }`}
              onClick={() => {
                handleUserClick(user.id);
                onSelectUser(user.name);
              }}
            >
              {userIconMap[user.id] || null}
              <div className="ml-4">
                {/* 人名 */}
                <p className="text-lg font-semibold">{user.name}</p>{" "}
                {/* 自己紹介文 */}
                <p className="text-sm text-gray-600">{user.intro}</p>{" "}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default UsersList;
