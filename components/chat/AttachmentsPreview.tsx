import React from 'react';
import type { ExtendedAttachment } from '@/types/chat';
import { PreviewAttachment } from '../preview-attachment';

interface AttachmentsPreviewProps {
  attachments: ExtendedAttachment[];
  uploadQueue: string[];
  onRemoveAttachment: (id: string) => void;
}

export const AttachmentsPreview: React.FC<AttachmentsPreviewProps> = ({ attachments, uploadQueue, onRemoveAttachment }) => {
  return (
    <div className="flex flex-row gap-2 overflow-x-scroll items-end">
      {attachments.map((attachment) => (
        <PreviewAttachment key={attachment.url} attachment={attachment} onCancel={() => onRemoveAttachment(attachment.id)} />
      ))}
      {uploadQueue.map((filename: string) => (
        <PreviewAttachment
          key={filename}
          attachment={{ url: '', name: filename, contentType: '' }}
          isUploading={true}
        />
      ))}
    </div>
  );
}; 