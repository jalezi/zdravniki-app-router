import { HTMLAttributes, PropsWithChildren } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { VariantProps } from 'class-variance-authority';

const headingVariants = cva('scroll-mt-48 md:scroll-mt-32', {
  variants: {
    variant: { mdx: 'group/heading', srOnly: 'sr-only' },
  },
  defaultVariants: {
    variant: 'mdx',
  },
});

export interface HProps
  extends HTMLAttributes<HTMLHeadingElement>,
    PropsWithChildren,
    VariantProps<typeof headingVariants> {}

export const H1 = ({ children, className, variant, ...props }: HProps) => {
  const styles = cn(headingVariants({ variant, className }));
  return (
    <h1 className={styles} {...props}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...props }: HProps) => {
  const styles = cn(headingVariants(), className);
  return (
    <h2 className={styles} {...props}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, className, ...props }: HProps) => {
  const styles = cn(headingVariants(), className);
  return (
    <h3 className={styles} {...props}>
      {children}
    </h3>
  );
};

export const H4 = ({ children, className, ...props }: HProps) => {
  const styles = cn(headingVariants(), className);
  return (
    <h4 className={styles} {...props}>
      {children}
    </h4>
  );
};

export const H5 = ({ children, className, ...props }: HProps) => {
  const styles = cn(headingVariants(), className);
  return (
    <h5 className={styles} {...props}>
      {children}
    </h5>
  );
};

export const H6 = ({ children, className, ...props }: HProps) => {
  const styles = cn(headingVariants(), className);
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

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants>,
    PropsWithChildren {
  as: keyof typeof components;
}

// todo rename "as" prop to "component"
export function Heading({ as, children, ...props }: HeadingProps) {
  const Component = components[as];
  return <Component {...props}>{children}</Component>;
}
