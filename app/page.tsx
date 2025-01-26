import Header from '@/components/header';
import { supabaseServer } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await (await supabase).auth.getUser();

  return (
    <>
      <Header user={data.user} />
      <main className="max-w-3xl mx-auto py-3 md:py-10 h-[calc(100vh-3.6rem)] p-1">
        <div className="h-full border rounded-md bg-card">Home</div>
      </main>
    </>
  );
}
