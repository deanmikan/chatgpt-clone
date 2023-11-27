import { createContext, useContext } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from "react-hook-form";

import { useUser } from "@/hooks/useUser";
import { useConversationsStore, useMessagesStore } from "@/store/conversations";
import { useRouter } from "next/navigation";
import MessageBox from "./MessageBox";
import MessageFormHintsContainer from "./MessageFormHintsContainer";
import { models } from "../../_constants/models";
import { useSettingsStore } from "@/store/settings";

interface MessageFormProps {
  conversationId?: string;
}

// Create a context to hold the register function
export const RegisterContext = createContext<{
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}>(null!);

export const useRegister = () => useContext(RegisterContext);

export default function MessageForm({ conversationId }: MessageFormProps) {
  const router = useRouter();
  const selectedModelId = useSettingsStore((state) => state.selectedModelId);

  const { register, handleSubmit, reset, watch } = useForm<FieldValues>({});
  const createConversation = useConversationsStore(
    (state) => state.createConversation
  );
  const createMessage = useMessagesStore((state) => state.createMessage);
  const updateMessage = useMessagesStore((state) => state.updateMessage);

  const { user } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (values, event) => {
    const selectedModel = models.find((model) => model.id === selectedModelId);

    const submitEvent = event?.nativeEvent as SubmitEvent | undefined;
    let submitter: HTMLElement | undefined;

    if (submitEvent) {
      submitter = submitEvent.submitter as HTMLElement;
    }

    let userInput = "";

    // Check if submitter was a hint
    if (submitter?.id?.startsWith("hintButton")) {
      const hintIndex = submitter.id.replace("hintButton", "");

      const hintValue = values[`hint${hintIndex}`];

      if (hintValue) {
        userInput = hintValue;
      }
    } else {
      userInput = values.userInput;
    }

    if (!userInput || !user) {
      console.log("No input or no user");

      return;
    }

    let messageConversationId = conversationId;

    if (!messageConversationId) {
      // Start new conversation
      const newConversation = await createConversation({
        user_id: user.id,
      });

      if (!newConversation) {
        console.error("Could not create conversation");
        return;
      }

      messageConversationId = newConversation.id;
    }

    // Add the user's first message to the conversation
    await createMessage({
      conversationId: messageConversationId,
      content: userInput,
      threadKey: "1",
    });

    reset();

    if (!conversationId) {
      router.push(`/c/${messageConversationId}`);
    }

    // Then create the assistant's first message
    const newMessage = await createMessage({
      role: "assistant",
      conversationId: messageConversationId,
      content: "",
      threadKey: "1",
    });

    if (!newMessage) {
      console.error("Could not create message");
      return;
    }

    // Initiate a response stream
    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        conversationId: messageConversationId,
        content: userInput,
        threadKey: "1",
        model: selectedModel?.model,
      }),
    });

    if (!response.ok) {
      console.error("Could not create message");
      return;
    }

    const data = response.body;

    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let finalString = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();

      done = doneReading;
      const chunkValue = decoder.decode(value);
      finalString += chunkValue;

      updateMessage(
        {
          id: newMessage.id,
          content: finalString,
        },
        {
          greedy: true,
        }
      );
    }

    console.log("DONE", finalString);
  };

  return (
    <div className="w-full mx-4 lg:max-w-2xl lg:mx-auto xl:max-w-3xl">
      <RegisterContext.Provider
        value={{ register, watch, handleSubmit, onSubmit }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {!conversationId && <MessageFormHintsContainer />}

          <MessageBox />
        </form>
      </RegisterContext.Provider>

      <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
        <span>
          MikanGPT can make mistakes. Consider checking important information.
        </span>
      </div>
    </div>
  );
}
