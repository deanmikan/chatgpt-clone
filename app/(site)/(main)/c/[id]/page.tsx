"use client";

import Spinner from "@/components/ui/spinner";
import { useUser } from "@/hooks/useUser";
import { useMessagesStore } from "@/store/conversations";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import ConversationContainer from "../../_components/ConversationContainer";
import MessageForm from "../../_components/MessageForm";
import Sidebar from "../../_components/Sidebar";

// Todo make this all SSR
export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, isLoading } = useUser();
  const fetchMessages = useMessagesStore((state) => state.fetchMessages);

  useEffect(() => {
    fetchMessages(params.id);
  }, [params.id]);

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

      <main className="flex flex-col flex-1 h-full overflow-y-auto">
        <ConversationContainer conversationId={params.id} />

        <MessageForm conversationId={params.id} />
      </main>
    </div>
  );
}
