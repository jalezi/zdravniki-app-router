import { HTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const addressItemVariants = cva('', {
  variants: {
    variant: {
      default: '',
      name: 'font-bold uppercase',
      address: 'text-text-400',
    },
    clamped: {
      true: 'line-clamp-1',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    clamped: false,
  },
});

export interface AddressItemProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof addressItemVariants> {
  text?: string;
}

const AddressItem = function AddressItem({
  children,
  variant = 'default',
  clamped = false,
  title,
  text,
  className,
  ...props
}: AddressItemProps) {
  return (
    <span
      className={cn(
        addressItemVariants({ variant, clamped, className }),
        title && 'cursor-help'
      )}
      title={title}
      {...props}
    >
      {children ?? text ?? title}
    </span>
  );
};

export default AddressItem;
