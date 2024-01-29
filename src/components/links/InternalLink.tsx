'use client';

import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { linkVariants } from './variants';

import type { LinkVariants } from './variants';

export type InternalLinkProps = LinkVariants &
  LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  PropsWithChildren<{ className?: string; canonicalHref?: LinkProps['href'] }>;

export const InternalLink = function InternalLink({
  href,
  variant,
  className,
  canonicalHref,
  children,
  ['aria-current']: ariaCurrent,
  ...props
}: InternalLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname === canonicalHref;

  return (
    <Link
      href={href}
      className={cn(linkVariants({ variant, className }))}
      aria-current={ariaCurrent ? ariaCurrent : isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default InternalLink;
