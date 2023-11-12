import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    sl: () => import('./sl'),
    en: () => import('./en'),
    it: () => import('./it'),
  });

export type Locales = ReturnType<typeof getCurrentLocale>;
