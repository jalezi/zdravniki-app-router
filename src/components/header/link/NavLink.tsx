import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

export interface NavLinkProps
  extends LinkProps,
    PropsWithChildren,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {}

const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <Link className={cn('nav-link', className)} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
