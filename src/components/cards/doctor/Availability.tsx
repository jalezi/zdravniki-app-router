import CircleChart from '@/components/ui/circle-chart';
import Tooltip from '@/components/ui/tooltip';

import { AvailabilityContent } from './tooltip-content';

export interface AvailabilityProps {
  availability: number;
}

export default function Availability({ availability }: AvailabilityProps) {
  const firstAvailabilityValue = availability > 1 ? 100 : availability * 100;
  const secondAvailabilityValue =
    availability > 1 ? availability * 100 - 100 : 0;
  return (
    <Tooltip content={<AvailabilityContent percentage={availability} />}>
      <span
        role='progressbar'
        aria-valuenow={availability}
        className='relative inline-block h-[1.625rem] w-[1.625rem] cursor-help place-self-center'
        aria-valuemin={0}
        aria-label="Doctor's availability"
      >
        <CircleChart
          value={firstAvailabilityValue}
          size='md'
          className='absolute inset-0'
          role={undefined}
          aria-valuenow={undefined}
          aria-valuemin={undefined}
          aria-valuemax={undefined}
          aria-hidden='true'
        />
        {secondAvailabilityValue ? (
          <CircleChart
            value={secondAvailabilityValue}
            size='sm'
            color='secondary'
            className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform'
            role={undefined}
            aria-valuenow={undefined}
            aria-valuemin={undefined}
            aria-valuemax={undefined}
            aria-hidden='true'
          />
        ) : null}
      </span>
    </Tooltip>
  );
}
