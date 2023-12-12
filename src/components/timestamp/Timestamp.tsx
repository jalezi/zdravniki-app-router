import { DOCTORS_TS_URL } from '@/lib/constants/url';
import { getTimestamp } from '@/lib/get-timestamp';
import { getScopedI18n } from '@/locales/server';

import { LongDate } from '../long-date';

export default async function Timestamp() {
  const timestamp = await getTimestamp(DOCTORS_TS_URL);
  const tFooter = await getScopedI18n('footer');
  const tTimestamp = await getScopedI18n('timestamp');

  return (
    <p className='not-prose'>
      {tFooter('lastChange')}:{' '}
      <strong>
        <LongDate
          timestamp={timestamp.data}
          timeDesignator={tTimestamp('at')}
          noData={tTimestamp('noData')}
          className='whitespace-nowrap'
        />
      </strong>
    </p>
  );
}
