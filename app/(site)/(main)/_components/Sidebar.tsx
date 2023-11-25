"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, ElementRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const isMobile = useMediaQuery("(max-width: 200px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const toggleSidebar = () => {
    if (isCollapsed) resetWidth();
    else collapse();
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "relative z-10 flex flex-col h-full overflow-y-auto group/sidebar bg-black w-60 transition-all duration-200",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
          isHoveringToggle || isCollapsed
            ? "filter brightness-75"
            : "filter brightness-100"
        )}
      >
        <div className="flex-none bg-red-100">GPTs section</div>
        <div className="flex-1 overflow-y-auto bg-yellow-100">Threads</div>
        <div className="flex-none h-20 bg-green-100">Auth profile</div>
      </aside>

      <div
        onClick={toggleSidebar}
        role="button"
        className={cn(
          "absolute w-8 h-20 transition-all rounded-sm text-muted-foreground top-1/2 group opacity-20 hover:opacity-100 -translate-y-1/2 flex items-center justify-center duration-300",
          isMobile && "opacity-100",
          isCollapsed ? "left-0" : "left-60"
        )}
        onMouseEnter={() => setIsHoveringToggle(true)}
        onMouseLeave={() => setIsHoveringToggle(false)}
      >
        <div className="flex flex-col items-center w-6 h-6">
          <div
            className={cn(
              "w-1 h-3 rounded-full bg-black transform translate-y-[0.15rem]  transition-all duration-200",
              isCollapsed
                ? "rotate-[-15deg]"
                : "rotate-0 group-hover:rotate-[15deg]"
            )}
          ></div>
          <div
            className={cn(
              "w-1 h-3 rounded-full bg-black transform translate-y-[-0.15rem]  transition-all duration-200",
              isCollapsed
                ? "rotate-[15deg]"
                : "rotate-0 group-hover:rotate-[-15deg]"
            )}
          ></div>
        </div>
      </div>
    </>
  );
}
