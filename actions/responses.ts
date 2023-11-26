"use server";

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateResponse({
  conversationId,
}: {
  conversationId: string;
}) {
  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId);

  if (messagesError) throw messagesError;

  // Sort by created_at descending
  messagesData.sort((a, b) => {
    return (
      DateTime.fromISO(a.created_at).toMillis() -
      DateTime.fromISO(b.created_at).toMillis()
    );
  });

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are MikanGPT, a helpful and friednly AI assistant.`,
    },
    ...messagesData.map((message) => {
      return {
        content: message.content,
        role: message.role,
      } as ChatCompletionMessageParam;
    }),
  ];

  const mostRecentMessage = messagesData[messagesData.length - 1];

  console.log("messages", messages);

  const completionResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages,
  });

  let response = completionResponse.choices[0].message.content as string;

  const { error: responseError } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role: "assistant",
    content: response.trim(),
    thread_key: mostRecentMessage.thread_key,
  });

  if (responseError) throw responseError;
}
