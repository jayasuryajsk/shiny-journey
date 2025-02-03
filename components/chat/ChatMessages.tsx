import React from 'react';
import type { Message } from 'ai';
import type { Vote } from '@/lib/db/schema';
import { MessageComponent } from './MessageComponent';

interface ChatMessagesProps {
  chatId: string;
  messages: Message[];
  vote?: Vote;
  isLoading: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  reload: (chatRequestOptions?: any) => Promise<string | null | undefined>;
  isReadonly: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatId,
  messages,
  vote,
  isLoading,
  setMessages,
  reload,
  isReadonly,
}) => {
  return (
    <div className="flex flex-col overflow-y-auto p-4">
      {messages.map((msg) => (
        <MessageComponent
          key={msg.id ? String(msg.id) : Math.random().toString()}
          chatId={chatId}
          message={msg}
          vote={vote}
          isLoading={isLoading}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />
      ))}
    </div>
  );
}; 