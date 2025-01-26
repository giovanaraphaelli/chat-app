/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client';

import { IMessage } from '@/lib/store/messages';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export function Message({ message }: { message: IMessage }) {
  return (
    <div className="flex gap-2">
      <Avatar className="h-9 w-9">
        <AvatarImage
          className="rounded-full"
          src={message.users?.avatar_url!}
          alt={`Imagem de ${message.users?.display_name}`}
        />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">{message.users?.display_name}</h1>
          <h2 className="text-xs text-muted-foreground">
            {new Date(message.created_at).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </h2>
        </div>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
