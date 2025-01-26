'use client';

import { supabaseBrowser } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Header({ user }: { user: User | null }) {
  function handleLogout() {
    const supabase = supabaseBrowser();
    supabase.auth.signOut();
    redirect('/login');
  }

  return (
    <header>
      <div className="flex justify-between items-center py-2 px-8 bg-card border-b">
        <div>
          <span className="font-bold">Chat App</span>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={user?.user_metadata?.name}
                  />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.user_metadata?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.user_metadata?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
