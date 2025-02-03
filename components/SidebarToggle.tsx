import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SidebarToggle: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    // Optionally, add logic to actually collapse/hide the sidebar
  };

  return (
    <Button onClick={handleToggle} variant="ghost" className="w-full">
      {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </Button>
  );
}; 