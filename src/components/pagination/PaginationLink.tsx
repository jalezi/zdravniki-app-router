import type { PropsWithChildren } from 'react';

import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { VariantProps } from 'class-variance-authority';

const paginationLinkVariants = cva(
  'rounded-full inline-flex items-center justify-center leading-none min-w-[4ch] p-[0.375rem] aspect-square text-sm transition-all duration-367 text-white ',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 hover:scale-110 focus-visible:scale-110',
        active: 'bg-brand-800 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type PaginationLinkVariants = VariantProps<
  typeof paginationLinkVariants
>;
export interface PaginationLinkProps
  extends VariantProps<typeof paginationLinkVariants>,
    PropsWithChildren<LinkProps> {
  className?: string;
}

const PaginationLink = function PaginationLink({
  href,
  variant,
  className,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(paginationLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
