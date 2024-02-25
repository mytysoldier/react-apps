import { useMutation } from "@apollo/client";
import { useState } from "react";
import { POST_MESSAGE_MUTATION } from "../../apis/mutation";

function ChatTextField({ targetUserID }: { targetUserID: string }) {
  const [message, setMessage] = useState("");

  const [postMessage, { data, loading, error }] = useMutation(
    POST_MESSAGE_MUTATION
  );

  return (
    <div className="flex p-3">
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        className="flex-auto mr-2 rounded-l p-3"
      />
      <button
        onClick={() => {
          postMessage({
            variables: { input: { text: message, userId: targetUserID } },
          });
        }}
        className="rounded-r p-3 bg-blue-500 text-white
         transition duration-300 hover:bg-blue-600"
      >
        送信
      </button>
    </div>
  );
}

export default ChatTextField;
