'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

import { Overlay } from '../ui/overlay';

const sidebarVariants = cva(
  'fixed z-[41] bg-footer-50 transition-all duration-650  max-h-[calc(100dvh-5rem)]  overflow-auto ',
  {
    variants: {
      device: {
        mobile: 'left-0 right-[35%] ',
        md: ' md:block sticky top-24 md:max-h-[calc(100dvh-6rem)]',
        xl: ' xl:block sticky top-24 xl:max-h-[calc(100dvh-6rem)]',
      },
      from: {
        right: 'left-[100%] right-0',
        left: 'left-[-65%] right-[100%]',
        none: undefined,
      },
      inset: {
        sidebar: 'top-20 bottom-0',
      },
      hiddenOn: {
        default: 'hidden',
        md: 'md:hidden',
      },
    },
    defaultVariants: {},
  }
);

export interface SidebarProps
  extends PropsWithChildren<{}>,
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

export default function Sidebar({
  device,
  className,
  children,
  inset,
  from,
  hiddenOn,
  ...props
}: SidebarProps) {
  const { isOpen } = useIsSidebarStore();

  const isForMobile = device === 'mobile';
  const _device = !isForMobile ? device : isOpen ? 'mobile' : undefined;

  return (
    <>
      <aside
        className={cn(
          sidebarVariants({
            device: _device,
            from: isOpen ? undefined : from ?? 'right',
            inset,
            hiddenOn,
          }),
          className
        )}
        {...props}
      >
        {children}
      </aside>
      {isForMobile ? (
        <Overlay
          isVisible={isOpen ? true : undefined}
          from='left'
          inset={inset ?? 'sidebar'}
          className='z-40'
        />
      ) : (
        false
      )}
    </>
  );
}
