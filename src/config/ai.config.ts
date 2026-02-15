// src/config/ai.config.ts
import { google } from '@ai-sdk/google';

export const GOOGLE_AI_MODELS = {
  DEFAULT: google('gemini-2.5-flash'),
  POWERFUL: google('gemini-2.5-pro'),
  FAST: google('gemini-2.5-flash-lite'),
} as const;

export const AI_SETTINGS = {
  TEMPERATURE: 0.7,
  MAX_OUTPUT_TOKENS: 2000,
};