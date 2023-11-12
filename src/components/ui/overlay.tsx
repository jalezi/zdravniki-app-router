import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const overlayVariants = cva(
  'fixed inset-0 z-40 transparent transition-all duration-650',
  {
    variants: {
      variant: {
        visible: 'bg-text-900/75 delay-367 z-40 md:delay-0',
        hidden: 'transparent -z-10',
      },
    },
    defaultVariants: {
      variant: 'hidden',
    },
  }
);

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible: true | undefined;
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, isVisible, ...props }, ref) => {
    return (
      <div
        className={cn(
          overlayVariants({
            variant: isVisible ? 'visible' : 'hidden',
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