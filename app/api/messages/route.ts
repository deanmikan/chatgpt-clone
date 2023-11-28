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

  // If there is only one message, let's also create a title for the conversation.
  if (messagesData.length === 1) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `Based on the message from the user, you are to summarise it into a title that is four words or less for the conversation thread. Return only the title in your response, nothing else.`,
      },
      {
        content: `Message content: "${messagesData[0].content}"`,
        role: "user",
      },
    ];

    openai.chat.completions
      .create({
        model: json.model ?? "gpt-3.5-turbo-1106",
        messages: messages,
      })
      .then((response) => {
        return supabase
          .from("conversations")
          .update({
            title: (response.choices[0].message.content ?? "").trim(),
          })
          .eq("id", json.conversationId)
          .select("*")
          .single();
      })
      .then(({ data: titleData, error: titleError }) => {
        if (titleError) {
          console.log("titleError", titleError);
        }
      });
  }

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
