import React from 'react';
import type { Message } from 'ai';
import type { Vote } from '@/lib/db/schema';

interface MessageComponentProps {
  chatId: string;
  message: Message;
  vote?: Vote;
  isLoading: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  reload: (chatRequestOptions?: any) => Promise<string | null | undefined>;
  isReadonly: boolean;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  chatId,
  message,
  vote,
  isLoading,
  setMessages,
  reload,
  isReadonly,
}) => {
  return (
    <div className="p-2 border-b">
      {/* Display message content. Extend this component as needed for editing, actions, etc. */}
      <div className="text-sm">
        {message.content}
      </div>
    </div>
  );
}; 