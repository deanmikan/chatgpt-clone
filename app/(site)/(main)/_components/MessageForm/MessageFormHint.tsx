import { useContext } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { RegisterContext } from ".";

interface MessageFormHintProps {
  title: string;
  subtitle: string;
  index: number;
}

export default function MessageFormHint({
  title,
  subtitle,
  index,
}: MessageFormHintProps) {
  const { register, watch, handleSubmit, onSubmit } =
    useContext(RegisterContext);

  return (
    <div>
      <input
        {...register(`hint${index}`)}
        className="hidden"
        value={`${title} ${subtitle}`}
        aria-label={`${title} ${subtitle}`}
      />

      <button
        id={`hintButton${index}`}
        className="relative flex items-center justify-between w-full gap-2 px-3 py-2 overflow-hidden text-left text-gray-700 border group rounded-xl hover:bg-gray-50"
      >
        <div className="flex flex-col flex-1 overflow-hidden text-sm">
          <div className="truncate">{title}</div>
          <div className="font-medium truncate opacity-60">{subtitle}</div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-center bg-gradient-to-l from-gray-100  from-[60%] pl-6 pr-2 opacity-0 group-hover:opacity-100">
          <div className="p-1.5 rounded-lg bg-gray-50">
            <FaArrowUp className="text-xs text-gray-700 group-hover:text-gray-600" />
          </div>
        </div>
      </button>
    </div>
  );
}
