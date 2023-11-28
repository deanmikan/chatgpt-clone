"use client";

import OpenAILogo from "@/components/OpenAILogo";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { ElementRef, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useMediaQuery } from "usehooks-ts";
import Conversations from "./Conversations";
import SidebarItem from "./SidebarItem";
import ProfileMenu from "./ProfileMenu";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const isMobile = useMediaQuery("(max-width: 200px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);

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
          "relative z-10 flex flex-col h-full overflow-y-auto group/sidebar bg-black w-60 transition-all duration-200 overflow-x-hidden",
          isResetting && "transition-all ease-in-out duration-200",
          isMobile && "w-0",
          isHoveringToggle || isCollapsed
            ? "filter brightness-50"
            : "filter brightness-100"
        )}
      >
        <div className="flex-none p-3">
          <SidebarItem
            leadingExtension={
              <OpenAILogo size="sm" className="text-black bg-white" />
            }
            title="ChatGPT"
            icon={FiEdit}
            variant="bold"
            href="/"
          />
        </div>
        <div className="flex-1 p-3 overflow-x-hidden overflow-y-auto">
          <Conversations />
        </div>
        <div className="relative flex-none w-full p-3 overflow-x-hidden">
          <ProfileMenu />
        </div>
      </aside>

      <div
        onClick={toggleSidebar}
        role="button"
        className={cn(
          "absolute w-8 h-20 transition-all rounded-sm text-muted-foreground top-1/2 group opacity-20 hover:opacity-100 -translate-y-1/2 flex items-center justify-center duration-200 z-20",
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
