import { useUser } from "@/hooks/useUser";
import { Conversation, Message } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { create } from "zustand";

type ConversationsState = {
  conversations: Conversation[];
  fetchConversations: () => void;
  createConversation: ({
    user_id,
  }: {
    user_id: string;
  }) => Promise<Conversation | undefined>;
};

export const useConversationsStore = create<ConversationsState>((set, get) => {
  const supabase = createClientComponentClient();

  return {
    conversations: [],
    fetchConversations: async () => {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      set({ conversations });
    },
    createConversation: async ({ user_id }) => {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user_id,
        })
        .select("*")
        .single();

      if (error) {
        console.error(data, error);
        return;
      }

      if (data) {
        await set((state) => ({
          conversations: [...state.conversations, data],
        }));
      }

      return data as Conversation;
    },
  };
});

type MessagesState = {
  messages: Message[];
  fetchMessages: (conversationId: string) => void;
  createMessage: ({
    conversationId,
    content,
    threadKey,
  }: {
    conversationId: string;
    content: string;
    threadKey: string;
  }) => Promise<Message | undefined>;
};

export const useMessagesStore = create<MessagesState>((set, get) => {
  const supabase = createClientComponentClient();

  return {
    messages: [],
    fetchMessages: async (conversationId) => {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId);

      if (error) {
        console.error(error);
        return;
      }

      set({ messages });
    },
    createMessage: async ({ conversationId, content, threadKey }) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          content: content,
          thread_key: threadKey,
        })
        .select("*")
        .single();

      if (error) {
        console.error(data, error);
        return;
      }

      if (data) {
        await set((state) => ({
          messages: [...state.messages, data],
        }));
      }

      return data as Message;
    },
  };
});
