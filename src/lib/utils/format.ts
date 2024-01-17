import { Locales } from '@/locales/config';

export const LOCALE_LANG_CODES_MAP = {
  en: 'en-GB',
  sl: 'sl-SL',
  it: 'it-IT',
} as const;

export const formatNumber = (number: number, locale: Locales = 'sl') => {
  return new Intl.NumberFormat(LOCALE_LANG_CODES_MAP[`${locale}`]).format(
    number
  );
};

// round on two decimals and locale number
export const formatNumberRound = (number: number, locale: Locales = 'sl') => {
  return new Intl.NumberFormat(LOCALE_LANG_CODES_MAP[`${locale}`], {
    maximumFractionDigits: 2,
  }).format(number);
};

// locale percent, max 2 decimals
export const formatPercent = (number: number, locale: Locales = 'sl') => {
  return new Intl.NumberFormat(LOCALE_LANG_CODES_MAP[`${locale}`], {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(number);
};
