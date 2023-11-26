import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { createContext, useContext } from "react";

import MessageBox from "./MessageBox";
import MessageFormHintsContainer from "./MessageFormHintsContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useConversationsStore, useMessagesStore } from "@/store/conversations";
import { useRouter } from "next/navigation";

interface MessageFormProps {}

// Create a context to hold the register function
export const RegisterContext = createContext<{
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}>(null!);

export const useRegister = () => useContext(RegisterContext);

export default function MessageForm({}: MessageFormProps) {
  const router = useRouter();

  const { register, handleSubmit, getValues, reset, watch } =
    useForm<FieldValues>({});
  const createConversation = useConversationsStore(
    (state) => state.createConversation
  );
  const createMessage = useMessagesStore((state) => state.createMessage);

  const { user } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("Form submission", values);

    const userInput = values.userInput;

    if (!userInput || !user) {
      console.log("No input or no user");

      return;
    }

    // Start new conversation
    const newConversation = await createConversation({
      user_id: user.id,
    });

    if (!newConversation) {
      console.error("Could not create conversation");
      return;
    }

    // Add the user's first message to the conversation
    const newMessage = await createMessage({
      conversationId: newConversation.id,
      content: userInput,
      threadKey: "1",
    });

    console.log("New message", newMessage);

    reset();

    router.push(`/c/${newConversation.id}`);
  };

  return (
    <div className="w-full mx-4 lg:max-w-2xl lg:mx-auto xl:max-w-3xl">
      <RegisterContext.Provider
        value={{ register, watch, handleSubmit, onSubmit }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <MessageFormHintsContainer />

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
