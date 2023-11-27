import { useContext, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { RegisterContext } from ".";

export default function MessageBox() {
  const [isFocused, setIsFocused] = useState(false);
  const { register, watch, handleSubmit, onSubmit } =
    useContext(RegisterContext);

  const userInput = watch("userInput");

  return (
    <div
      className={cn(
        "flex flex-col w-full flex-grow relative border rounded-xl bg-white",
        isFocused ? "border-gray-400/70 shadow" : "border-gray-300 shadow-sm"
      )}
    >
      <TextareaAutosize
        {...register("userInput", { required: true })}
        autoFocus
        id="userInput"
        tabIndex={0}
        placeholder="Message MikanGPT..."
        className="m-0 w-full resize-none border-0 bg-transparent py-2 pr-10 focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-12 pl-3 max-h-[200px] h-[52px] focus:outline-none overflow-y-hidden"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      />
      <button
        className={cn(
          "absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 right-2 bottom-1.5 transition-colors disabled:opacity-40",
          userInput
            ? "bg-black text-white"
            : "bg-gray-400 text-white opacity-40"
        )}
        disabled={!userInput}
      >
        <FaArrowUp className="text-base" />
      </button>
    </div>
  );
}
