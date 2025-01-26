'use client';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/utils/supabase/client';
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
      <div className="flex flex-col justify-center items-center gap-4 px-6 pt-6 pb-10 bg-card border rounded-lg shadow-lg w-full max-w-60">
        <h1 className="font-bold text-2xl text-center">Login</h1>
        <p className="text-sm text-gray-500">welcome to chat!</p>
        <Button
          onClick={handleLoginWithGithub}
          className="flex items-center gap-2 justify-center"
        >
          <GithubLogo weight="bold" /> Login with Github
        </Button>
      </div>
    </div>
  );
}
