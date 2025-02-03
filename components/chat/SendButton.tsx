import React, { memo } from 'react';
import { Button } from '../ui/button';
import { ArrowUpIcon } from '../icons';

export interface SendButtonProps {
  submitForm: () => void;
  input: string;
  uploadQueue: string[];
}

const PureSendButton: React.FC<SendButtonProps> = ({ submitForm, input, uploadQueue }) => {
  return (
    <Button
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0 || uploadQueue.length > 0}
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
};

export const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length) return false;
  if (prevProps.input !== nextProps.input) return false;
  return true;
}); 