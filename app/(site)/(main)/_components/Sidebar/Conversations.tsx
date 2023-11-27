import { useConversationsStore } from "@/store/conversations";
import SidebarItem from "./SidebarItem";
import { useEffect, useMemo } from "react";
import { DateTime } from "luxon";

interface ConversationsProps {}

export default function Conversations({}: ConversationsProps) {
  const conversations = useConversationsStore((state) => state.conversations);
  const fetchConversations = useConversationsStore(
    (state) => state.fetchConversations
  );

  useEffect(() => {
    fetchConversations();
  }, []);

  function groupConversations(conversations: any[]) {
    const groupedConversations: {
      [key: string]: any[];
    } = {
      Today: [],
      Yesterday: [],
      "Last 7 days": [],
      "Previous 30 days": [],
    };

    const now = DateTime.local();

    conversations.forEach((conversation) => {
      const createdAt = DateTime.fromISO(conversation.created_at);
      const diff = now.diff(createdAt, "days").days;

      if (diff < 1) {
        groupedConversations["Today"].push(conversation);
      } else if (diff < 2) {
        groupedConversations["Yesterday"].push(conversation);
      } else if (diff < 7) {
        groupedConversations["Last 7 days"].push(conversation);
      } else if (diff < 30) {
        groupedConversations["Previous 30 days"].push(conversation);
      }
    });

    // Filter out empty groups
    const nonEmptyGroups = Object.keys(groupedConversations).filter(
      (group) => groupedConversations[group].length > 0
    );

    const filteredGroupedConversations: {
      [key: string]: any[];
    } = {};
    nonEmptyGroups.forEach((group) => {
      filteredGroupedConversations[group] = groupedConversations[group];
    });

    return filteredGroupedConversations;
  }

  // Inside the Conversations component
  const groupedConversations = useMemo(
    () => groupConversations(conversations),
    [conversations]
  );

  return Object.keys(groupedConversations).map((group) => (
    <div key={group}>
      <div className="px-2 pb-1 p">
        <h2 className="text-xs text-white/50">{group}</h2>
      </div>

      {groupedConversations[group].map((conversation) => (
        <SidebarItem
          key={conversation.id}
          title={conversation.title}
          variant="normal"
          href={`/c/${conversation.id}`}
        />
      ))}
    </div>
  ));
}
