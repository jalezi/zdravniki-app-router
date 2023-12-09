'use client';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';

export interface MdxActionsProps {}
export default function MdxActions() {
  const { toggle, isOpen } = useIsSidebarStore();

  console.log('isOpen', isOpen);

  return (
    <div className='fixed top-12 z-40 flex w-full items-center bg-brand-50'>
      <button
        onClick={() => toggle()}
        className='px-2 py-1'
        aria-label='Expand Sidebar'
      >
        <PanelLeftOpen aria-hidden='true' />
      </button>
    </div>
  );
}
