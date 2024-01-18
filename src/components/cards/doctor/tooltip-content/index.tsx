import { DateSchema } from '@/lib/schemas';
import { format } from '@/lib/utils';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import { TooltipContentPrimitives } from './Primitives';

export interface AcceptsContentProps {
  load: number;
  date: DateSchema | null;
  note: string | null;
}

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
    <TooltipContentPrimitives.Root variant='flexCol'>
      <TooltipContentPrimitives.Header align='center'>
        {t('headQuotient')}
      </TooltipContentPrimitives.Header>
      <TooltipContentPrimitives.P size='xl' align='center'>
        {formatedLoad}
      </TooltipContentPrimitives.P>
      <TooltipContentPrimitives.Divider />
      {hasOverride ? (
        <TooltipContentPrimitives.Footer className=''>
          {note ? (
            <TooltipContentPrimitives.P>{note}</TooltipContentPrimitives.P>
          ) : null}
          {date ? (
            <TooltipContentPrimitives.P>
              {tInfo('changedOn')}:{' '}
              <time dateTime={date.toISOString().slice(0, 10)}>
                {date.toLocaleDateString(locale)}
              </time>
            </TooltipContentPrimitives.P>
          ) : null}
        </TooltipContentPrimitives.Footer>
      ) : null}
    </TooltipContentPrimitives.Root>
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
    <TooltipContentPrimitives.Root variant='flexCol'>
      <TooltipContentPrimitives.Header className=''>
        {t('doctorAvailabilityWithPercent', { number: title })}
      </TooltipContentPrimitives.Header>
      <TooltipContentPrimitives.Divider />
      <TooltipContentPrimitives.P className=''>
        {t('doctorAvailabilityDescription')}
      </TooltipContentPrimitives.P>
    </TooltipContentPrimitives.Root>
  );
};
