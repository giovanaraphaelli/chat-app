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
  actionMessage: IMessage | undefined;
  addMessages: (message: IMessage) => void;
  setActionMessage: (message: IMessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticUpdateMessage: (message: IMessage) => void;
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessages: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== messageId),
    })),
  optimisticUpdateMessage: (updateMessage) =>
    set((state) => ({
      messages: state.messages.filter((msg) => {
        if (msg.id === updateMessage.id) {
          msg.text = updateMessage.text;
          msg.is_edit = updateMessage.is_edit;
        }
        return msg;
      }),
    })),
}));
