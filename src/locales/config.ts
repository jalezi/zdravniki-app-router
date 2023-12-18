import { createI18nMiddleware } from 'next-international/middleware';

export const I18nConfig = {
  locales: ['en', 'it', 'sl'],
  defaultLocale: 'sl',
} as const;
export const I18nMiddleware = createI18nMiddleware(I18nConfig);

export const translations = {
  sl: () => import('./sl'),
  en: () => import('./en'),
  it: () => import('./it'),
};

export type Locales = (typeof I18nConfig.locales)[number];
