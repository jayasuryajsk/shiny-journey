import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string) => {
  // Use Google provider for Gemini models, OpenAI for others
  const provider = apiIdentifier.startsWith('gemini-') ? google : openai;
  
  return wrapLanguageModel({
    model: provider(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
