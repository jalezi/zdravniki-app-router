import { Divider } from '@/components/ui/divider';
import { DateSchema } from '@/lib/schemas';
import { format } from '@/lib/utils';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

export type OverrideNote =
  | {
      date?: null;
      note?: null;
    }
  | {
      date: DateSchema;
      note: string;
    };

export type AcceptsContentProps = {
  load: number;
} & OverrideNote;

/**
 *
 * @param {AcceptsContentProps} props
 * @param {number} props.load
 * @returns
 */
export const AcceptsContent = async function AcceptsContent({
  load,
  date,
  note,
}: AcceptsContentProps) {
  const t = await getScopedI18n('zzzs');
  const tInfo = await getScopedI18n('doctor.info');
  const locale = getCurrentLocale();
  const formatedLoad = format.formatNumber(load, locale);

  const hasOverride = note || date;

  return (
    <>
      <header className='text-center'>{t('headQuotient')}</header>
      <p className='text-center text-lg'>{formatedLoad}</p>
      {hasOverride ? (
        <>
          <Divider />
          <footer>
            {note ? <p>{note}</p> : null}
            {date ? (
              <p>
                {tInfo('changedOn')}:{' '}
                <time dateTime={date.toISOString().slice(0, 10)}>
                  {date.toLocaleDateString(locale)}
                </time>
              </p>
            ) : null}
          </footer>
        </>
      ) : null}
    </>
  );
};

export interface AvailabilityContentProps {
  percentage: number; // as #.#####
}

/**
 *
 * @param {AvailabilityContentProps} props
 * @param {number} props.percentage - as #.#####
 * @returns
 */
export const AvailabilityContent = async function AvailabilityContent({
  percentage,
}: AvailabilityContentProps) {
  const t = await getScopedI18n('zzzs');
  const title = format.formatPercent(percentage, 'sl');
  return (
    <>
      <header className=''>
        {t('doctorAvailabilityWithPercent', { number: title })}
      </header>
      <Divider />
      <p>{t('doctorAvailabilityDescription')}</p>
    </>
  );
};
