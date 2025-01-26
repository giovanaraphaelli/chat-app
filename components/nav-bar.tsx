'use client';

import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header>
      <div className="flex justify-between items-center py-2 px-6">
        <div className="flex gap-2 justify-center items-center ">
          <span className="font-bold">Chat App</span>
        </div>

        <div className="flex gap-2 md:gap-4">
          <Button>Login</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
