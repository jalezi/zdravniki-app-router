'use client';

import { PanelLeftOpen } from 'lucide-react';

import { Overlay } from '@/components/ui/overlay';
import { useIsSidebarStore } from '@/lib/store';

export interface MdxActionsProps {}
export default function MdxActions() {
  const { toggle, isOpen } = useIsSidebarStore();

  console.log('isOpen', isOpen);

  return (
    <>
      <Overlay
        isVisible={isOpen ? true : undefined}
        from='left'
        inset='sidebar'
      />
      <div className='fixed left-0 top-12 z-40 flex min-h-[2rem] w-full items-center bg-brand-50 text-sm md:top-16'>
        <button
          onClick={() => toggle()}
          className='px-2 py-1 md:invisible'
          aria-label='Expand Sidebar'
        >
          <PanelLeftOpen aria-hidden='true' />
        </button>
        some text
      </div>
    </>
  );
}
