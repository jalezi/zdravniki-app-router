import { format } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

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
