import { create } from 'zustand';

export interface IMessage {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string | null;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
}

interface MessagesState {
  messages: IMessage[];
  addMessages: (message: IMessage) => void;
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  addMessages: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
