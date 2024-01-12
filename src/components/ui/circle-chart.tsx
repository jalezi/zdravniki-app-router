import { HTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { z } from 'zod';

import ValidationError from '@/lib/errors/ValidationError';
import { cn } from '@/lib/utils';

const circleChartVariants = cva('w-[1em] h-[1em]', {
  variants: {
    size: {
      sm: 'text-[1rem]',
      md: 'text-[1.625rem]',
    },
    color: {
      primary: 'text-brand-500',
      secondary: 'text-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

const validValue = z.number().min(0).max(100);

export interface CircleChartProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof circleChartVariants> {
  value: number;
  ['aria-valuenow']?: number;
  ['aria-valuemin']?: number;
  ['aria-valuemax']?: number;
}
export default function CircleChart({
  value,
  className,
  size,
  color,
  ...props
}: CircleChartProps) {
  const parsedValue = validValue.safeParse(value);

  if (!parsedValue.success) {
    const error = new ValidationError({
      message: `Invalid value for CircleChart: ${value}. Should be between 0 and 100. Using 0 or 100 instead.`,
      context: { error: parsedValue.error },
    });
    console.warn(error.message);
  }

  const valueInRange = Math.min(Math.max(value, 0), 100);

  const styles = cn(
    circleChartVariants({ size, color, className }),
    'circle-chart'
  );

  return (
    <span
      role='progressbar'
      aria-valuenow={valueInRange}
      aria-valuemin={0}
      className={styles}
      {...props}
    >
      <svg width='1em' height='1em' viewBox='0 0 36 36'>
        <path
          className='fill-none stroke-[3.8] opacity-10'
          stroke='currentColor'
          d='M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831'
        />
        <path
          className={`fill-none stroke-[2.8]`}
          stroke='currentColor'
          strokeDasharray={`${valueInRange} 100`}
          d='M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831'
        />
      </svg>
    </span>
  );
}
