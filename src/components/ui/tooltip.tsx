'use client';

import { ReactNode, useEffect, useState } from 'react';

import * as PopoverRadix from '@radix-ui/react-popover';
import * as TooltipRadix from '@radix-ui/react-tooltip';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  'select-none px-4 py-2 text-xs font-medium max-w-72 will-change-[transform,opacity] focus-within:outline-none focus:outline-none',
  {
    variants: {
      variant: {
        default: 'rounded bg-text-400  text-white',
        success: 'rounded bg-green-700 text-white',
        error: 'rounded bg-red-700 text-white ',
      },
      animation: {
        default:
          'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'default',
    },
  }
);

const arrowVariants = cva('', {
  variants: {
    variant: {
      default: 'fill-text-400',
      success: 'fill-green-700',
      error: 'fill-red-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  className,
  variant,
  animation,
}: TooltipProps) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    if ('ontouchstart' in document.documentElement) {
      setIsMobileDevice(true);
    }
  }, []);

  if (isMobileDevice) {
    return (
      <PopoverRadix.Root>
        <PopoverRadix.Trigger asChild>{children}</PopoverRadix.Trigger>
        <PopoverRadix.Portal>
          <PopoverRadix.Content
            className={cn(tooltipVariants({ variant, animation, className }))}
            sideOffset={5}
          >
            {content}
            <PopoverRadix.Arrow className={cn(arrowVariants({ variant }))} />
          </PopoverRadix.Content>
        </PopoverRadix.Portal>
      </PopoverRadix.Root>
    );
  }

  return (
    <TooltipRadix.Root>
      <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className={cn(tooltipVariants({ variant, animation, className }))}
          sideOffset={5}
        >
          {content}
          <TooltipRadix.Arrow className={cn(arrowVariants({ variant }))} />
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  );
}
