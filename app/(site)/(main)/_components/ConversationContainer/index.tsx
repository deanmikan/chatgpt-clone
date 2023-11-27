import OpenAILogo from "@/components/OpenAILogo";
import Header from "./Header";
import { useMessagesStore } from "@/store/conversations";
import Message from "./Message";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface ConversationContainerProps {
  conversationId?: string;
}

export default function ConversationContainer({
  conversationId,
}: ConversationContainerProps) {
  const allMessages = useMessagesStore((state) => state.messages);
  const conversationMessages = allMessages.filter(
    (message) => message.conversation_id === conversationId
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationMessages]);

  return (
    <div className={cn("relative flex-1", conversationId && "overflow-y-auto")}>
      <Header />

      {!conversationId ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-3 h-[72px] w-[72px]">
            <div className="relative flex items-center justify-center h-full text-black bg-white border-2 border-gray-200 rounded-full shadow-sm">
              <OpenAILogo size="xl" />
            </div>
          </div>
          <div className="mb-5 text-2xl font-semibold">
            How can I help you today?
          </div>
        </div>
      ) : (
        <div className="relative flex-1 ">
          <div className="h-full overflow-y-auto">
            {conversationMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}
