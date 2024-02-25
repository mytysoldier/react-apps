import { useSubscription } from "@apollo/client";
import { MESSAGE_POSTED_SUBSCRIPTION } from "../../apis/subscription";
import { formatDate } from "../../util/date_util";
import { useEffect, useState } from "react";
import { userIconMap } from "../../constant/Constant";

function ChatMessage({
  userID,
  className,
}: {
  userID: string;
  className?: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  const { data, loading } = useSubscription(MESSAGE_POSTED_SUBSCRIPTION, {
    variables: { userID },
  });

  useEffect(() => {
    if (data && data.messagePosted) {
      setMessages((prevMessages) => [...prevMessages, data.messagePosted]);
    }
  }, [data]);

  return (
    <div className={`${className} p-3`}>
      {!loading && (
        <>
          {messages.map((data) => (
            <>
              <p className="text-xs p-3">
                {formatDate(data.createdAt, "MM月dd日(E) HH:mm")}
              </p>
              <div className="flex h-8">
                <div className="mr-6">{userIconMap[userID] || null}</div>

                <p className="flex-auto h-8 bg-blue-500 text-white
                 rounded-lg p-3 font-bold flex items-center">
                  {data.text}
                </p>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default ChatMessage;
