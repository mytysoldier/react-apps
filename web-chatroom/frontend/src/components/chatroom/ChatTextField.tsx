import { useState } from "react";

function ChatTextField({ userID }: { userID: string }) {
  const [message, setMessage] = useState("");

  const postMessage = (message: string) => {};

  return (
    <input
      type="text"
      onChange={(e) => setMessage(e.target.value)}
      className=" w-full"
    />
  );
}

export default ChatTextField;
