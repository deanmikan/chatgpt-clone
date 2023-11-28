import { Message, MessageRole } from "@/types";
import MessageControls from "./MessageControls";
import OpenAILogo from "@/components/OpenAILogo";
import { DominoSpinner } from "react-spinners-kit";

interface MessageProps {
  message: Message;
}

export default function Message({ message }: MessageProps) {
  const messageRoleToName = (role: string) => {
    switch (role) {
      case "user":
        return "You";
      case MessageRole.Assistant:
        return "MikanGPT";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex w-full p-4 py-2 m-auto ">
      <div className="flex flex-1 gap-4 group mx-auto md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl w-full">
        {/* Avatar */}
        <div className="relative flex flex-col items-end flex-shrink-0">
          <div className="pt-0.5">
            <div className="flex items-center justify-center w-6 h-6 overflow-hidden rounded-full bg-[#925CB1] text-white text-[0.5rem]">
              {message.role === MessageRole.User ? (
                <span>DM</span>
              ) : (
                <OpenAILogo size="xs" />
              )}
            </div>
          </div>
        </div>

        {/* Message content */}
        <div className="relative flex flex-col">
          <div className="font-bold">{messageRoleToName(message.role)}</div>

          {message.content ? (
            <p className="whitespace-pre-line">{message.content}</p>
          ) : (
            <div className="mt-1">
              <DominoSpinner size={60} color="#925CB1" />
            </div>
          )}

          {/* Controls */}
          <div className="invisible empty:hidden ">
            <MessageControls message={message} />
          </div>
        </div>
      </div>
    </div>
  );
}
