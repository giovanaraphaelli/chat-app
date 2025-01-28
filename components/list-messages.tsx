/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { IMessage, useMessages } from '@/lib/store/messages';
import { Message } from './message';
import { DeleteAlert, EditAlert } from './message-actions';
import { useEffect, useRef } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function ListMessages() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    addMessages,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticUpdateMessage,
  } = useMessages((state) => state);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const chanel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from('users')
              .select('*')
              .eq('id', payload.new.send_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = { ...payload.new, users: data };
              addMessages(newMessage as IMessage);
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages' },
        (payload) => {
          optimisticUpdateMessage(payload.new as IMessage);
        }
      )
      .subscribe();
    return () => {
      chanel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 flex flex-col p-2 overflow-y-auto h-full m-2"
      ref={scrollRef}
    >
      <div className="space-y-5">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
      <DeleteAlert />
      <EditAlert />
    </div>
  );
}
