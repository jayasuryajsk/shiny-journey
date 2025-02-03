import React from 'react';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange, fileInputRef }) => {
  return (
    <input
      type="file"
      className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
      ref={fileInputRef}
      multiple
      onChange={onChange}
      tabIndex={-1}
    />
  );
}; 