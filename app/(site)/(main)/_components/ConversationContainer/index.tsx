import OpenAILogo from "@/components/OpenAILogo";
import Header from "./Header";

interface ConversationContainerProps {}

export default function ConversationContainer({}: ConversationContainerProps) {
  return (
    <div className="relative flex-1 overflow-hidden">
      <Header />

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
    </div>
  );
}
