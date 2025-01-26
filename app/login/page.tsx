'use client';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/client';
import { GithubLogo } from 'phosphor-react';

export default function LoginPage() {
  function handleLoginWithGithub() {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + '/auth/callback',
      },
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 py-8 px-2  bg-card border rounded-lg shadow-lg w-full max-w-72">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">Login</h1>
          <h2 className="font-bold">bem-vindo ao chat!</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          Faça login para enviar mensagens
        </p>

        <Button onClick={handleLoginWithGithub}>
          <GithubLogo weight="bold" /> Login com Github
        </Button>
      </div>
    </div>
  );
}
