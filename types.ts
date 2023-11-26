export enum MessageRole {
  Human = "human",
  Assistant = "assistant",
}

export interface Profile {
  id: string;
  email: string;
}

export type Message = {
  id: string;
  content: string;
  conversation_id: string;
  thread_key: string;
  role: MessageRole;
};

export type Conversation = {
  id: string;
  user_id: string;
  title: string;
};
