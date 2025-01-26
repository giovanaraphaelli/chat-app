import ChatInput from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';
import Header from '@/components/header';
import InitUser from '@/lib/store/initUser';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await (await supabase).auth.getUser();

  return (
    <>
      <Header user={data.user} />
      <main className="max-w-3xl mx-auto py-3 md:py-10 h-[calc(100vh-3.6rem)] p-1">
        <div className="h-full border rounded-md bg-card flex flex-col ">
          <ChatMessages />
          <ChatInput />
        </div>
      </main>
      <InitUser user={data.user} />
    </>
  );
}
