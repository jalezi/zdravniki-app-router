import { getCurrentLocale, getScopedI18n } from '@/locales/server';

const LOCALE_MAP = {
  en: 'en-US',
  sl: 'sl-SL',
  it: 'it-IT',
} as const;

export type LongDateProps = {
  timestamp: number | string | null;
};

/**
 * This function takes a timestamp (in seconds) and returns a formatted date and time string.
 * The format of the date and time string is determined by the current locale.
 * If the timestamp is null, it returns a localized 'noData' string.
 *
 * @param {Object} props - The properties passed to the function.
 * @param {number|string|null} props.timestamp - The timestamp to format in seconds. Can be a number, a string, or null.
 * @returns {string | JSX.Element} A time element with the formatted date and time string.
 */
export default async function LongDate({ timestamp }: LongDateProps) {
  const t = await getScopedI18n('timestamp');
  const locale = getCurrentLocale();

  if (!timestamp) {
    return t('noData');
  }

  const dateLocale = LOCALE_MAP[locale];

  const tsMilliseconds = +timestamp * 1000;
  const localeDate = new Date(tsMilliseconds);

  const date = localeDate.toLocaleString(dateLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = localeDate.toLocaleString(dateLocale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const dateTime = localeDate.toLocaleString(dateLocale);

  return (
    <time dateTime={dateTime}>
      {date} {t('at')} {time}
    </time>
  );
}
