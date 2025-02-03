import React from 'react';
import type { User } from 'next-auth';
import { SidebarHistory } from './SidebarHistory';
import { SidebarUserNav } from './SidebarUserNav';
import { SidebarToggle } from '../SidebarToggle';

interface SidebarProps {
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <aside className="flex flex-col bg-gray-100 dark:bg-zinc-900 w-64 h-full">
      <div className="p-4 border-b dark:border-zinc-700">
        <SidebarUserNav user={user} />
      </div>
      <div className="flex-grow overflow-y-auto">
        <SidebarHistory user={user} />
      </div>
      <div className="p-4 border-t dark:border-zinc-700">
        <SidebarToggle />
      </div>
    </aside>
  );
}; 