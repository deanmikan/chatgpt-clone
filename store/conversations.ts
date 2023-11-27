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
    role,
  }: {
    conversationId: string;
    content: string;
    threadKey: string;
    role?: "user" | "assistant";
  }) => Promise<Message | undefined>;
  updateMessage: (
    {
      id,
      content,
    }: {
      id: string;
      content: string;
    },
    {
      greedy,
    }: {
      greedy?: boolean;
    }
  ) => Promise<Message | undefined>;
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
    createMessage: async ({
      conversationId,
      content,
      threadKey,
      role = "user",
    }) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          content: content,
          thread_key: threadKey,
          role: role,
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
    updateMessage: async ({ id, content }, { greedy = false }) => {
      if (greedy) {
        await set((state) => ({
          messages: state.messages.map((message) => {
            if (message.id === id) {
              return {
                ...message,
                content,
              };
            }

            return message;
          }),
        }));
      }

      const { data, error } = await supabase
        .from("messages")
        .update({
          content,
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error) {
        console.error("THERE WAS AN ERROR", data, error);
        return;
      }

      if (data && !greedy) {
        await set((state) => ({
          messages: state.messages.map((message) => {
            if (message.id === id) {
              return data as Message;
            }

            return message;
          }),
        }));
      }

      return data as Message;
    },
  };
});
