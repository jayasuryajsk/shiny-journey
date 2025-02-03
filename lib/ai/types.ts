export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  attachments?: Array<{
    url: string;
    name: string;
    contentType: string;
  }>;
  experimental_attachments?: Array<{
    name: string;
    url: string;
    contentType: string;
    extra?: Record<string, any>;
  }>;
} 