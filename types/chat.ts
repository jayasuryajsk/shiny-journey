import type { Attachment, Message } from 'ai';

export interface ExtendedAttachment extends Attachment {
  id: string;
  previewUrl: string;
  isUploading: boolean;
}

export interface ExtendedMessage extends Message {
  // You can extend with additional properties if needed
} 