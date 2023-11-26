import { FiShare } from "react-icons/fi";
import ModelMenuButton from "./ModelMenuButton";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <div className="sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 bg-white/95 p-2 font-semibold">
      <div className="flex items-center gap-2">
        <ModelMenuButton />
      </div>

      <div className="flex gap-2 pr-1">
        <button className="relative flex items-center justify-center border rounded-lg btn btn-neutral btn-small h-9 w-9 whitespace-nowrap border-token-border-medium focus:ring-0">
          <div className="flex items-center justify-center w-full gap-2">
            <FiShare className="text-black" />
          </div>
        </button>
      </div>
    </div>
  );
}
