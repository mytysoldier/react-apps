import { Link } from "react-router-dom";
import UsersList from "../../components/home/UsersList";
import { useState } from "react";

function Home() {
  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");

  return (
    <>
      <p className="text-center">
        チャットルームを開設します。送信元と送信先のユーザーをそれぞれ選択してください。
      </p>
      <div className="flex mt-3">
        <div className="w-1/2">
          <p className="text-center mb-3">送信元ユーザー：{user1 || ""}</p>
          <UsersList onSelectUser={(userName) => setUser1(userName)} />
        </div>
        <div className="w-1/2">
          <p className="text-center mb-3">送信先ユーザー：{user2 || ""}</p>
          <UsersList onSelectUser={(userName) => setUser2(userName)} />
        </div>
      </div>
      <Link to="/chatroom" className="mt-3 flex justify-center">
        チャットルームへ
      </Link>
    </>
  );
}

export default Home;
