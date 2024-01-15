import { ReactNode } from 'react';

import { TIME } from '@/lib/constants';
import { DOCTORS_TS_URL } from '@/lib/constants/url';
import { cn, fetchTimestamp } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

import { LongDate } from '../long-date';

export interface TimestampProps {
  variant: 'footer' | 'mdx-actions';
  text?: ReactNode;
}

export default async function Timestamp({ variant, text }: TimestampProps) {
  const timestamp = await fetchTimestamp(
    DOCTORS_TS_URL,
    TIME.ONE_HOUR_IN_SECONDS,
    ['doctor', 'timestamp']
  );
  const tFooter = await getScopedI18n('footer');
  const tTimestamp = await getScopedI18n('timestamp');

  const commonStyles = 'whitespace-nowrap text-xs';
  const footerLongVerStyles = '';
  const footerShortVerStyles = 'hidden';

  const mdxActionsLongVerStyles = 'hidden sm:inline';
  const mdxActionsShortVerStyles = 'sm:hidden';

  const longStyles = cn(
    commonStyles,
    variant === 'footer' ? footerLongVerStyles : mdxActionsLongVerStyles
  );

  const shortStyles = cn(
    commonStyles,
    variant === 'footer' ? footerShortVerStyles : mdxActionsShortVerStyles
  );

  const _text = text || tFooter('lastChange');

  return (
    <p className='not-prose text-xs'>
      {_text}:{' '}
      <strong>
        <LongDate
          timestamp={timestamp.data}
          formatOptions='full'
          noData={tTimestamp('noData')}
          className={longStyles}
        />
        <LongDate
          timestamp={timestamp.data}
          formatOptions='medium'
          noData={tTimestamp('noData')}
          className={shortStyles}
        />
      </strong>
    </p>
  );
}
