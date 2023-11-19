import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export interface HeadingsProps
  extends HTMLAttributes<HTMLHeadingElement>,
    PropsWithChildren<{}> {}

export const H1 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-14 md:scroll-mt-16', className);
  return (
    <h1 className={styles} {...props}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-14 md:scroll-mt-16', className);
  return (
    <h2 className={styles} {...props}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-14 md:scroll-mt-16', className);
  return (
    <h3 className={styles} {...props}>
      {children}
    </h3>
  );
};

export const H4 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-14 md:scroll-mt-16', className);
  return (
    <h4 className={styles} {...props}>
      {children}
    </h4>
  );
};

export const H5 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-14 md:scroll-mt-16', className);
  return (
    <h5 className={styles} {...props}>
      {children}
    </h5>
  );
};

export const H6 = ({ children, className, ...props }: HeadingsProps) => {
  const styles = cn('group/heading scroll-mt-16 md:scroll-mt-18', className);
  return (
    <h6 className={styles} {...props}>
      {children}
    </h6>
  );
};

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
} as const;
