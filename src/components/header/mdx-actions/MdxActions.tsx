'use client';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';

export interface MdxActionsProps {}
export default function MdxActions() {
  const { toggle } = useIsSidebarStore();

  return (
    <div className='fixed left-0 top-12 z-40 flex min-h-[2rem] w-full items-center bg-brand-50 text-sm md:top-16'>
      <button
        onClick={() => toggle()}
        className='px-2 py-1 md:invisible'
        aria-label='Expand Sidebar'
      >
        <PanelLeftOpen aria-hidden='true' />
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
