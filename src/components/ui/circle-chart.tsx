import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface CircleChartProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
}
export default function CircleChart({
  value,
  className,
  ...props
}: CircleChartProps) {
  const percentage = value * 100;

  const styles = cn('', className);

  return (
    <span className={styles} {...props}>
      <svg width='1em' height='1em' viewBox='0 0 36 36'>
        <path
          className='fill-none stroke-text-50 stroke-[3.8]'
          d='M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831'
        />
        <path
          className='animate-circleChartFill fill-none stroke-brand-500 stroke-[2.8] delay-500 '
          strokeDasharray={`${percentage} 100`}
          d='M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831'
        />
      </svg>
    </span>
  );
}
