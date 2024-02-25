import { Link } from "react-router-dom";
import UsersList from "../../components/home/UsersList";
import { useEffect, useState } from "react";

const userNameIdMap: { [key: string]: string } = {
  John: "1",
  Ninja: "2",
  Ojisan: "3",
  Alice: "4",
  Taisyo: "5",
  Wrestler: "6",
};

function Home() {
  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);

  useEffect(() => {
    if (user1 == "" || user2 == "" || user1 == user2) {
      setIsLinkDisabled(true);
    } else {
      setIsLinkDisabled(false);
    }
  }, [user1, user2]);

  return (
    <>
      <p className="text-center">
        チャットルームを開設します。送信元と送信先のユーザーをそれぞれ選択してください。
      </p>
      <div className="flex justify-center">
        <Link
          to={`${isLinkDisabled ? "" : "/chatroom"}?user1=${
            userNameIdMap[user1]
          }&user2=${userNameIdMap[user2]}`}
          className={`w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 flex items-center justify-center ${
            isLinkDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          チャットルームへ
        </Link>
      </div>
      <div className="flex mt-3">
        <div className="w-1/2">
          <p className="text-center mb-3">送信元ユーザー：{user1 || ""}</p>
          <UsersList
            onSelectUser={(userName) =>
              setUser1(user1 === userName ? "" : userName)
            }
          />
        </div>
        <div className="w-1/2">
          <p className="text-center mb-3">送信先ユーザー：{user2 || ""}</p>
          <UsersList
            onSelectUser={(userName) =>
              setUser2(user2 === userName ? "" : userName)
            }
          />
        </div>
      </div>
    </>
  );
}

export default Home;
