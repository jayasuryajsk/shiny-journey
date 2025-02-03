import React, { memo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { StopIcon } from '../icons';
import { sanitizeUIMessages } from '@/lib/utils';
import type { Message } from 'ai';

export interface StopButtonProps {
  stop: () => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const PureStopButton: React.FC<StopButtonProps> = ({ stop, setMessages }) => {
  return (
    <Button
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => sanitizeUIMessages(messages));
      }}
    >
      <StopIcon size={14} />
    </Button>
  );
};

export const StopButton = memo(PureStopButton); 