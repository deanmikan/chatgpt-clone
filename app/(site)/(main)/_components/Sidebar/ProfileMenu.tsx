import { useUser } from "@/hooks/useUser";
import SidebarItem from "./SidebarItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineExitToApp } from "react-icons/md";
import "./ProfileMenu.styles.css";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ProfileMenuProps {}

export default function ProfileMenu({}: ProfileMenuProps) {
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    router.push("/auth");

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SidebarItem
            className="h-12 p-3"
            leadingExtension={
              <div
                aria-hidden
                className="flex items-center justify-center text-black bg-[#925CB1] rounded-full w-8 h-8"
              >
                <span className="text-xs text-white">DM</span>
              </div>
            }
            title={user.email!}
            variant="bold"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="DropdownMenuContent">
          <DropdownMenuItem asChild>
            <button className="w-full cursor-pointer" onClick={handleLogout}>
              <MdOutlineExitToApp className="inline-block mr-2" />
              <div>Log out</div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
