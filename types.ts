export enum MessageRole {
  User = "user",
  Assistant = "assistant",
}

export interface Profile {
  id: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;
  conversation_id: string;
  thread_key: string;
  role: MessageRole;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
}

export interface Model {
  id: string;
  model: string;
  name: string;
  version: string;
  description: string;
  modelDisplayName: string;
  limit?: string;
  icon: React.ReactNode;
}
