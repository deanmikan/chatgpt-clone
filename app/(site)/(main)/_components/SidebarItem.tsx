import { cn } from "@/lib/utils";
import Image from "next/image";

interface SidebarItemProps {
  leadingExtension?: React.ReactNode;
  title: string;
  icon?: React.ComponentType;
  variant?: "bold" | "normal";
  className?: string;
}

export default function SidebarItem({
  leadingExtension: LeadingExtension,
  title,
  icon: Icon,
  variant = "normal",
  className,
}: SidebarItemProps) {
  return (
    <a
      className={cn(
        "flex items-center h-10 gap-2 px-2 font-medium text-white rounded-lg cursor-pointer select-none group hover:bg-white/10",
        className
      )}
    >
      {LeadingExtension && LeadingExtension}

      <div className="flex flex-col flex-1 overflow-hidden">
        <div
          className={cn(
            "text-sm font-semibold truncate",
            variant === "bold" ? "font-medium" : "font-normal"
          )}
        >
          {title}
        </div>
      </div>

      {Icon && (
        <div>
          <Icon />
        </div>
      )}
    </a>
  );
}
