import ChatMessage from "../../components/chatroom/ChatMessage";
import ChatTextField from "../../components/chatroom/ChatTextField";
import { useLocation } from "react-router-dom";

const userIdNameMap: { [key: string]: string } = {
  "1": "John",
  "2": "Ninja",
  "3": "Ojisan",
  "4": "Alice",
  "5": "Taisyo",
  "6": "Wrestler",
};

function Chatroom() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const user1 = searchParams.get("user1") || "";
  const user2 = searchParams.get("user2") || "";

  return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-slate-400 w-1/2 h-full">
        <div className="flex justify-center">
          <p>{userIdNameMap[user1]}のチャットルーム</p>
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto">
          <ChatMessage userID={user1} />
        </div>
        <div>
          <ChatTextField targetUserID={user1} />
        </div>
      </div>
      <div className="flex flex-col bg-cyan-100 w-1/2 h-full">
        <div className="flex justify-center">
          <p>{userIdNameMap[user2]}のチャットルーム</p>
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto">
          <ChatMessage userID={user2} />
        </div>
        <div>
          <ChatTextField targetUserID={user2} />
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
