import { format } from '@/lib/utils';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

export interface AcceptsContentProps {
  load: number;
}

/**
 *
 * @param {AcceptsContentProps} props
 * @param {number} props.load
 * @returns
 */
export const AcceptsContent = async function AcceptsContent({
  load,
}: AcceptsContentProps) {
  const t = await getScopedI18n('zzzs');
  const locale = getCurrentLocale();
  const formatedLoad = format.formatNumber(load, locale);
  return (
    <div className='max-w-80 text-xs tracking-wide'>
      <header className='border-b-2 font-semibold leading-8'>
        {t('headQuotient')}
      </header>
      <p className='grid place-content-center pt-2 text-xl font-medium'>
        {formatedLoad}
      </p>
    </div>
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
    <div className='max-w-80 text-xs tracking-wide'>
      <header className='border-b-2 font-semibold leading-8'>
        {t('doctorAvailabilityWithPercent', { number: title })}
      </header>
      <p className='pt-2 font-medium'>{t('doctorAvailabilityDescription')}</p>
    </div>
  );
};
