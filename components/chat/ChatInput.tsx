import React from 'react';
import { MultimodalInput } from './multimodal-input';

// ChatInput acts as a wrapper to the MultimodalInput component
export const ChatInput: React.FC<any> = (props) => {
  return <MultimodalInput {...props} />;
}; 