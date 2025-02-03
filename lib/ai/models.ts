// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gemini-2.0-flash-exp',
    label: 'Gemini 2.0 Flash',
    apiIdentifier: 'gemini-2.0-flash-exp',
    description: 'Latest Gemini model - Fast, powerful, and efficient',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gemini-2.0-flash-exp';
