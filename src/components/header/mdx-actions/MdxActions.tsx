'use client';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export interface MdxActionsProps {}
export default function MdxActions() {
  const { toggle, isOpen } = useIsSidebarStore();

  return (
    <div
      id='toc-actions-wrapper'
      className='fixed left-0 top-12 z-40 flex min-h-[2rem] w-full items-center bg-brand-50 text-sm md:top-16'
    >
      <button
        onClick={() => toggle()}
        className='px-2 py-1 md:invisible'
        aria-label='Expand Sidebar'
      >
        <PanelLeftOpen
          aria-hidden='true'
          className={cn('transition-all duration-367', isOpen && 'rotate-180')}
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
  );
}
