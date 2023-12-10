import { forwardRef, HTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const overlayVariants = cva('fixed transparent transition-all duration-650', {
  variants: {
    variant: {
      visible: 'bg-text-900/75 delay-367 z-40 md:delay-0 left-0 right-0',
      hidden: '',
    },
    from: {
      right: 'left-[100%] right-0',
      left: 'left-0 right-[100%]',
    },
    inset: {
      menu: 'top-0 bottom-0',
      sidebar: 'top-20 bottom-0',
    },
  },
  defaultVariants: {
    variant: 'hidden',
  },
});

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: true | undefined;
  from?: 'left' | 'right';
  inset: 'menu' | 'sidebar';
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, isVisible, from, inset, ...props }, ref) => {
    return (
      <div
        id={`overlay-${from}`}
        className={cn(
          overlayVariants({
            variant: isVisible ? 'visible' : 'hidden',
            from: isVisible ? undefined : from ?? 'right',
            inset,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Overlay.displayName = 'Overlay';

export { Overlay, overlayVariants };
