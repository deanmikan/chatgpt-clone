"use client";

import Spinner from "@/components/ui/spinner";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import ConversationContainer from "./_components/ConversationContainer";
import MessageForm from "./_components/MessageForm";
import Sidebar from "./_components/Sidebar";

export default function HomePage() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <Spinner />
      </div>
    );

  if (!user) {
    return redirect("/auth");
  }

  return (
    <div className="flex h-full">
      <Sidebar />

      <main className="flex flex-col flex-1 h-full overflow-y-auto transition-all">
        <ConversationContainer />

        <MessageForm />
      </main>
    </div>
  );
}
