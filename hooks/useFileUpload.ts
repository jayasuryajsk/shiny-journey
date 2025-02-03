import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { Attachment } from 'ai';

export function useFileUpload() {
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);

  const uploadFile = useCallback(async (file: File): Promise<Attachment | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;
        return { url, name: pathname, contentType } as Attachment;
      } else {
        const { error } = await response.json();
        toast.error(error);
        return null;
      }
    } catch (error) {
      toast.error('Failed to upload file, please try again!');
      return null;
    }
  }, []);

  return { uploadFile, uploadQueue, setUploadQueue };
} 