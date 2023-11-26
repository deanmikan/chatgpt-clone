import { GoPencil } from "react-icons/go";
import { Message } from "@/types";

interface MessageControlsProps {
  message: Message;
}

export default function MessageControls({ message }: MessageControlsProps) {
  return (
    <div>
      <button className="flex items-center justify-center w-6 h-6 text-gray-400 rounded-full hover:text-black">
        <GoPencil className="w-4 h-4" />
      </button>
    </div>
  );
}
