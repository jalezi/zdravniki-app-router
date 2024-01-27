import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import { linkVariants } from './variants';

import type { LinkVariants } from './variants';

export type ExternalLinkProps = LinkVariants &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{
    className?: string;
  }>;

export const ExternalLink = function ExternalLink({
  href,
  variant,
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={cn(linkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
