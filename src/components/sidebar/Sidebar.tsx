'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';

import { cva } from 'class-variance-authority';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

import { Overlay } from '../ui/overlay';

const overlayVariants = cva(
  'fixed z-[41] bg-white transition-all duration-650  h-[calc(100dvh-5.5rem)] overflow-auto ',
  {
    variants: {
      device: {
        mobile: 'left-0 right-[35%] ',
        md: 'mdx-aside-grid md:block sticky top-24 mt-8 md:h-[calc(100dvh-6rem)]',
        lg: 'mdx-aside-grid',
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
        sm: 'sm:hidden',
        md: 'md:hidden',
      },
    },
    defaultVariants: {},
  }
);

export interface SidebarProps
  extends PropsWithChildren<{}>,
    HTMLAttributes<HTMLDivElement> {
  device: 'mobile' | 'md' | 'lg';
  from?: 'left' | 'right' | 'none';
  inset?: 'sidebar';
  hiddenOn?: 'sm' | 'md' | 'default';
}

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
          overlayVariants({
            device: _device,
            from: isOpen ? undefined : from ?? 'right',
            inset,
            hiddenOn,
          }),
          className
        )}
        {...props}
      >
        <header className=''>
          <h2 className='mx-2 mt-2 font-semibold '>Kazalo</h2>
        </header>
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
