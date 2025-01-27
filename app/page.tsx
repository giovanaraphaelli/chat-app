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
      <main className="flex justify-center items-center min-h-screen p-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] border rounded bg-card w-full max-w-4xl h-[35rem]">
          <div className="flex flex-col h-full border-r">
            <ul className="flex-1 hidden sm:block p-4">
              <li>user 1</li>
              <li>user 2</li>
              <li>user 3</li>
            </ul>

            <Header />
          </div>

          <div className="flex flex-col h-full overflow-y-auto">
            <ChatMessages />
            <ChatInput />
          </div>
        </div>
      </main>
      <InitUser user={data.user} />
    </>
  );
}
