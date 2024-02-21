import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../apis/query";
import { ChatMessage } from "../../models/ChatMessage";
import ChatMessageArea from "../../components/chatroom/ChatMessageArea";

function Chatroom() {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.messages.map((message: ChatMessage) => (
    <div>
      <ChatMessageArea message={message} />
      {/* <p>{message.text}</p>
      <p>{message.createdAt}</p>
      <p>{message.userId}</p> */}
    </div>
  ));
}

export default Chatroom;
