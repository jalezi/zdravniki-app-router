'use client';
import { createI18nClient } from 'next-international/client';

import { translations } from './config';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
} = createI18nClient(translations);
