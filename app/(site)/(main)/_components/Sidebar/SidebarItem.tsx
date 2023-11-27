import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface SidebarItemProps {
  leadingExtension?: React.ReactNode;
  title: string;
  icon?: React.ComponentType;
  variant?: "bold" | "normal";
  className?: string;
  href?: string;
}

const LinkOrButton: React.FC<SidebarItemProps> = ({
  leadingExtension: LeadingExtension,
  title,
  icon: Icon,
  variant = "normal",
  className,
  href,
}) => {
  const content = (
    <>
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
    </>
  );

  const wrapperClass = cn(
    "flex items-center h-10 gap-2 px-2 font-medium text-white rounded-lg cursor-pointer select-none group hover:bg-white/10",
    className
  );

  return href ? (
    <Link href={href} className={wrapperClass}>
      {content}
    </Link>
  ) : (
    <a className={wrapperClass}>{content}</a>
  );
};

export default LinkOrButton;
