"use client";

import Sidebar from "@/app/(site)/(main)/_components/Sidebar";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import ConversationContainer from "../../_components/ConversationContainer";
import MessageForm from "../../_components/MessageForm";
import { useMessagesStore } from "@/store/conversations";
import { useEffect } from "react";

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
