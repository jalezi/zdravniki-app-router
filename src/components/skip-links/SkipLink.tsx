import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export interface SkipLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren<{}> {}

export default function SkipLink({
  children,
  className,
  ...props
}: SkipLinkProps) {
  const styles = cn(
    'right-0 left-0 absolute focus:top-80 p-3 md:p-5 text-center font-semibold bg-brand-500/90',
    className
  );
  return (
    <a className={styles} {...props}>
      {children}
    </a>
  );
}
