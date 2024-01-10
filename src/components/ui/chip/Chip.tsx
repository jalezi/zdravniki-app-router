import { HTMLAttributes, PropsWithChildren } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Icons } from '../../icons';

import type { IconName } from '../../icons';
import type { VariantProps } from 'class-variance-authority';

const rootVariants = cva('inline-flex items-center px-1 tracking-wide', {
  variants: {
    variant: {
      default: 'rounded',
      left: 'rounded-l',
      right: 'rounded-r',
    },
    colors: {
      default: 'bg-text-50/70 text-text-900/80 ',
      subtype: 'bg-text-200/40 text-text-900/80',
      clinic: 'bg-brand-200/80 text-brand-900/80',
    },
  },
  defaultVariants: {
    variant: 'default',
    colors: 'default',
  },
});

export interface RootProps
  extends HTMLAttributes<HTMLSpanElement>,
    PropsWithChildren,
    VariantProps<typeof rootVariants> {}

const Root = function ({
  children,
  variant,
  colors,
  className,
  ...props
}: RootProps) {
  const styles = cn(rootVariants({ variant, colors, className }));

  return (
    <span className={styles} {...props}>
      {children}
    </span>
  );
};

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  iconName: IconName;
}

const Icon = function ({ iconName, className, ...props }: IconProps) {
  const SVGIcon = Icons[iconName];

  const styles = cn('grid aspect-square min-w-6 place-items-center', className);

  return (
    <span {...props} className={styles}>
      <SVGIcon />
    </span>
  );
};

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {}

const Text = function ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const styes = cn('text-xs', className);
  return (
    <span className={styes} {...props}>
      {children}
    </span>
  );
};

export const Chip = {
  Root,
  Icon,
  Text,
};

export default Chip;
