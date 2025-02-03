import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { PencilEditIcon } from '../icons';
import { Markdown } from '../markdown';
import { cn } from '@/lib/utils';

interface MessageContentProps {
  content: string;
  role: string;
  isReadonly: boolean;
  mode: 'view' | 'edit';
  onEdit: () => void;
}

export const MessageContent: React.FC<MessageContentProps> = ({ content, role, isReadonly, mode, onEdit }) => {
  if (mode !== 'view') return null;

  return (
    <div className="flex flex-row gap-2 items-start">
      {role === 'user' && !isReadonly && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="px-2 h-fit rounded-full text-muted-foreground opacity-0 group-hover/message:opacity-100"
              onClick={onEdit}
            >
              <PencilEditIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit message</TooltipContent>
        </Tooltip>
      )}
      <div
        className={cn('flex flex-col gap-4', {
          'bg-primary text-primary-foreground px-3 py-2 rounded-xl': role === 'user'
        })}
      >
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}; 