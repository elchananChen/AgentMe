// src/config/ai.config.ts
import { google } from '@ai-sdk/google';

export const GOOGLE_AI_MODELS = {
  DEFAULT: google('gemini-flash-latest'),
  FAST: google('gemini-flash-lite-latest'),
  POWERFUL: google('gemini-pro-latest'),
} as const;

export const AI_SETTINGS = {
  TEMPERATURE: 0.7,
  MAX_OUTPUT_TOKENS: 2000,
};