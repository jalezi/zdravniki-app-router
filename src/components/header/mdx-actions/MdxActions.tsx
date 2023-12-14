'use client';

import { ReactNode } from 'react';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export interface MdxActionsProps {}
export default function MdxActions({ children }: { children?: ReactNode }) {
  const { toggle, isOpen } = useIsSidebarStore();

  return (
    <div className='mx-auto flex h-8 max-w-7xl items-center  child:text-sm'>
      <div className='-ml-2 mr-auto flex items-center md:hidden'>
        <button
          onClick={() => toggle()}
          className='px-2 py-1 md:hidden'
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
      </div>
      <div className='ml-auto md:ml-0'>{children}</div>
    </div>
  );
}
