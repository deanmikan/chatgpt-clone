import { OpenAIStream, StreamingTextResponse } from "ai";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const runtime = "edge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(request: Request) {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });
  const user_id =
    (await (await supabase.auth.getUser()).data?.user?.id) ?? null;
  const json = await request.json();

  // All messages that aren't empty
  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", json.conversationId)
    .neq("content", "");

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

  const completionStream = await openai.chat.completions.create({
    model: json.model ?? "gpt-3.5-turbo-1106",
    messages: messages,
    stream: true,
  });

  // Respond with the stream
  const stream = OpenAIStream(completionStream);
  return new StreamingTextResponse(stream);
}
