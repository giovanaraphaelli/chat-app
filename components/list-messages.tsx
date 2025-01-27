'use client';

import { useMessages } from '@/lib/store/messages';
import { Message } from './message';

export function ListMessages() {
  const messages = useMessages((state) => state.messages);
  return (
    <div className="flex-1 flex flex-col p-2 overflow-y-auto h-full m-2">
      <div className="space-y-5">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
    </div>
  );
}
