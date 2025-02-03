import { useState, useCallback } from 'react';

interface BlockContentEditorProps {
  content: string;
  onSaveContent: (content: string, debounce: boolean) => void;
  isContentDirty: boolean;
}

export function BlockContentEditor({ content, onSaveContent, isContentDirty }: BlockContentEditorProps) {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    onSaveContent(e.target.value, true);
  }, [onSaveContent]);

  return (
    <div>
      <textarea 
        value={localContent} 
        onChange={handleChange} 
        style={{ width: '100%', height: '150px' }}
      />
      {isContentDirty && <span>Saving...</span>}
    </div>
  );
} 