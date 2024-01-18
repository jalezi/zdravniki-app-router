import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { VariantProps } from 'class-variance-authority';

const rootVariants = cva('max-w-80 font-medium', {
  variants: {
    variant: {
      normal: '',
      flexRow: 'flex flex-row',
      flexCol: 'flex flex-col',
    },

    size: {
      xs: 'text-xs py-1 gap-1',
      sm: 'text-sm py-2 gap-2',
      xl: 'text-xl py-4 gap-4',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'normal',
    size: 'sm',
    align: 'left',
  },
});

interface RootPrimitiveProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren,
    VariantProps<typeof rootVariants> {}

export const RootPrimitive = function RootPrimitive({
  children,
  className,
  variant,
  size,
  align,
}: RootPrimitiveProps) {
  return (
    <div className={cn(rootVariants({ variant, size, align, className }))}>
      {children}
    </div>
  );
};

const headerVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      xl: 'text-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'xs',
    align: 'left',
  },
});

interface HeaderPrimitiveProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren,
    VariantProps<typeof headerVariants> {}

const HeaderPrimitive = function HeaderPrimitive({
  children,
  className,
  size,
  align,
}: HeaderPrimitiveProps) {
  return (
    <header className={cn(headerVariants({ size, align, className }))}>
      {children}
    </header>
  );
};

const DividerPrimitive = function DividerPrimitive() {
  return <hr className='w-full border-[0.5px]' aria-hidden='true' />;
};

const footerVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      xl: 'text-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'xs',
    align: 'left',
  },
});

interface FooterPrimitiveProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren,
    VariantProps<typeof footerVariants> {}

const FooterPrimitive = function FooterPrimitive({
  children,
  className,
  size,
  align,
}: FooterPrimitiveProps) {
  return (
    <footer className={cn(footerVariants({ size, align, className }))}>
      {children}
    </footer>
  );
};

const paragraphVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      xl: 'text-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'xs',
    align: 'left',
  },
});

interface ParagraphPrimitiveProps
  extends HTMLAttributes<HTMLParagraphElement>,
    PropsWithChildren,
    VariantProps<typeof paragraphVariants> {}

const ParagraphPrimitive = function ParagraphPrimitive({
  children,

  className,
  size,
  align,
}: ParagraphPrimitiveProps) {
  return (
    <p className={cn(paragraphVariants({ size, align, className }))}>
      {children}
    </p>
  );
};

export const TooltipContentPrimitives = {
  Root: RootPrimitive,
  Header: HeaderPrimitive,
  Divider: DividerPrimitive,
  Footer: FooterPrimitive,
  P: ParagraphPrimitive,
};

export default TooltipContentPrimitives;
