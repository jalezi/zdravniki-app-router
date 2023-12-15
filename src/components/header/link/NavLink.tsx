import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import Link, { LinkProps } from 'next/link';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkVariants = cva('', {
  variants: {
    variant: {
      header: 'nav-link',
      footer:
        'inline-flex items-center gap-2 text-base text-footer-900  transition-colors hover:text-footer-500',
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export type NewNavLinkProps = (PropsWithChildren<{
  className?: string | undefined;
}> &
  VariantProps<typeof linkVariants>) &
  (
    | ({
        as: typeof Link;
      } & Omit<LinkProps, 'as'> &
        AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({
        as: 'a';
      } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

export default function NewNavLink({
  as,
  children,
  className,
  variant,
  href,
  ...props
}: NewNavLinkProps) {
  if (as === 'a') {
    return (
      <a
        href={href}
        className={cn(linkVariants({ variant, className }))}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(linkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
