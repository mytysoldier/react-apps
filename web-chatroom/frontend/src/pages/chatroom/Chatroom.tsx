import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../apis/query";
import ChatMessageArea2 from "../../components/chatroom/ChatMessage";
import ChatMessage from "../../components/chatroom/ChatMessage";
import ChatTextField from "../../components/chatroom/ChatTextField";

function Chatroom() {
  // const { loading, error, data } = useQuery(GET_MESSAGES);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex h-screen">
      <div className="bg-slate-400 w-1/2 h-full">
        <ChatMessage userID="1" />
        <ChatTextField userID="1" />
      </div>
      <ChatMessage userID="2" className="bg-red-500 w-1/2 h-full" />
      {/* <p>{message.text}</p>
      <p>{message.createdAt}</p>
      <p>{message.userId}</p> */}
    </div>
  );

  // return data.messages.map((message: ChatMessage) => (
  //   <div className="flex h-screen">
  //     <ChatMessageArea2 userID="1" className="bg-slate-400 w-1/2 h-full" />
  //     <ChatMessageArea message={message} className="bg-red-500 w-1/2 h-full" />
  //     {/* <p>{message.text}</p>
  //     <p>{message.createdAt}</p>
  //     <p>{message.userId}</p> */}
  //   </div>
  // ));
}

export default Chatroom;
