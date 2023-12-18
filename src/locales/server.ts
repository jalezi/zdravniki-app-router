import { createI18nServer } from 'next-international/server';

import { translations } from './config';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(translations);
