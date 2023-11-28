"use server";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateConversationTitle(messageContent: string) {
  // If there is only one message, let's also create a title for the conversation.
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `Summarise the message content into a title that is four words or less. Use title case. Return only the title in your response, nothing else.`,
    },
    {
      content: `Message content: "${messageContent}"`,
      role: "user",
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages,
  });

  return (response.choices[0].message.content ?? "").trim();
}
