import { createI18nMiddleware } from 'next-international/middleware';

import { I18N_CONFIG } from '../../rewrites.config.mjs';

export const I18nMiddleware = createI18nMiddleware(I18N_CONFIG);

export const translations = {
  sl: () => import('./sl'),
  en: () => import('./en'),
  it: () => import('./it'),
};

export type Locales = keyof typeof translations;
