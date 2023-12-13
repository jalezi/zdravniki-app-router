import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';

const LOCALE_MAP = {
  en: 'en-US',
  sl: 'sl-SL',
  it: 'it-IT',
} as const;

export interface LongDateProps extends HTMLAttributes<HTMLTimeElement> {
  timestamp: number | string | null;
  formatOptions: Intl.DateTimeFormatOptions['dateStyle'];
  noData?: string;
}

/**
 * This function takes a timestamp (in seconds) and returns a formatted date and time string.
 * The format of the date and time string is determined by the current locale.
 * If the timestamp is null, it returns a localized 'noData' string.
 *
 * @param {Object} props - The properties passed to the function.
 * @param {number|string|null} props.timestamp - The timestamp to format in seconds. Can be a number, a string, or null.
 * @param {Intl.DateTimeFormatOptions['dateStyle']} props.formatOptions - The format options for the date and time string.
 * @param {string} props.noData - The localized 'noData' string to return if the timestamp is null.
 * @returns {string | JSX.Element} A time element with the formatted date and time string.
 */
export default async function LongDate({
  timestamp,
  formatOptions,
  noData,
  className,
  ...props
}: LongDateProps) {
  const locale = getCurrentLocale();

  if (!timestamp) {
    return noData;
  }

  const dateLocale = LOCALE_MAP[locale];

  const tsMilliseconds = +timestamp * 1000;
  const localeDate = new Date(tsMilliseconds);

  const date = localeDate.toLocaleString(dateLocale, {
    dateStyle: formatOptions,
    timeStyle: formatOptions,
  });

  let i = date.lastIndexOf(':');
  let dateTrimmedToMinutes = date.substring(0, i);

  if (formatOptions === 'full') {
    i = dateTrimmedToMinutes.lastIndexOf(':');
    dateTrimmedToMinutes = dateTrimmedToMinutes.substring(0, i);
  }
  const dateTime = localeDate.toLocaleString(dateLocale);

  const styles = cn(className);

  return (
    <time className={styles} dateTime={dateTime} {...props}>
      {dateTrimmedToMinutes}
    </time>
  );
}
