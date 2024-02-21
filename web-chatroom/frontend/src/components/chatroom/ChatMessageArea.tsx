import { ChatMessage } from "../../models/ChatMessage";

function ChatMessageArea({ message }: { message: ChatMessage }) {
  return (
    <div>
      <p>Text: {message.text}</p>
      <p>Created At: {message.createdAt}</p>
      <p>User ID: {message.userId}</p>
    </div>
  );
}

export default ChatMessageArea;
