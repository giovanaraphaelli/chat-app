import { Suspense } from 'react';
import { ListMessages } from './list-messages';
import { supabaseServer } from '@/lib/supabase/server';
import InitMessages from '@/lib/store/initMessage';

export async function ChatMessages() {
  const supabase = supabaseServer();

  const { data } = await (await supabase)
    .from('messages')
    .select('*, users(*)');

  return (
    <Suspense fallback={'carregando...'}>
      <ListMessages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
