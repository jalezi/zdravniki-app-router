'use client';

import { ReactNode } from 'react';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export interface MdxActionsProps {}
export default function MdxActions({ children }: { children?: ReactNode }) {
  const { toggle, isOpen } = useIsSidebarStore();

  return (
    <div className='mx-auto -ml-2 flex max-w-7xl items-center px-4 child:text-sm'>
      <div className='mr-auto flex items-center'>
        <button
          onClick={() => toggle()}
          className='px-2 py-1 md:invisible'
          aria-label='Expand Sidebar'
        >
          <PanelLeftOpen
            aria-hidden='true'
            className={cn(
              'transition-all duration-367',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <button
          onClick={() => toggle()}
          className='px-2 py-1 md:hidden'
          aria-label='Expand Sidebar'
        >
          Kazalo &gt;
        </button>
      </div>
      <div className='ml-auto '>{children}</div>
    </div>
  );
}
