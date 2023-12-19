'use client';

import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';

import { PanelLeftOpen } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export interface MdxActionsProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}
export default function MdxActions({ children }: MdxActionsProps) {
  const { toggle, isOpen } = useIsSidebarStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressBar = ref.current?.querySelector('[role=progressbar]');
    if (!progressBar) return;

    const viewportHeight = window.innerHeight;
    const pageHeight = document.body.offsetHeight;

    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const pageHeight = document.body.offsetHeight;

      if (viewportHeight === pageHeight) {
        // @ts-ignore
        progressBar.style.borderColor = 'transparent';
        progressBar.setAttribute('aria-hidden', 'true');
      } else {
        // @ts-ignore
        progressBar.style.borderColor = 'var(--border-color)';
        progressBar.removeAttribute('aria-hidden');
      }
    };

    window.addEventListener('resize', handleResize);

    if (viewportHeight === pageHeight) {
      // @ts-ignore
      progressBar.style.borderColor = 'transparent';
      progressBar.setAttribute('aria-hidden', 'true');
    } else {
      // @ts-ignore
      progressBar.style.borderColor = 'var(--border-color)';
      const scrollTop = window.scrollY;
      const max = pageHeight - viewportHeight;
      const value = ((scrollTop / max) * 100).toFixed();

      progressBar.setAttribute('aria-valuenow', value);
    }

    const handleScroll = () => {
      // set progress bar value
      const scrollTop = window.scrollY;
      const max = pageHeight - viewportHeight;
      const value = ((scrollTop / max) * 100).toFixed();
      progressBar?.setAttribute('aria-valuenow', value);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      ref={ref}
      className='mx-auto flex h-8 max-w-7xl items-center  child:text-sm'
    >
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
      {children}
    </aside>
  );
}
