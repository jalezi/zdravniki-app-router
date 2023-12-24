import { createI18nMiddleware } from 'next-international/middleware';

import { I18N_CONFIG } from '../../rewrites-redirects.config.mjs';

export const I18nMiddleware = createI18nMiddleware(I18N_CONFIG);

export const LOCALES = I18N_CONFIG.locales;
export const DEFAULT_LOCALE = I18N_CONFIG.defaultLocale;

export const translations = {
  sl: () => import('./sl'),
  en: () => import('./en'),
  it: () => import('./it'),
};

export type Locales = (typeof LOCALES)[number];
