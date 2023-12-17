'use client';

import {
  HTMLAttributes,
  LinkHTMLAttributes,
  PropsWithChildren,
  useMemo,
} from 'react';

import { useParams, usePathname } from 'next/navigation';

import { ChevronDown } from 'lucide-react';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

import {
  MdxHeading as IMdxHeading,
  useActiveHeading,
  useHeadings,
} from './hooks';

interface NavigationLinkProps
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren<{}> {
  href: string;
}

const TocLink = ({ href, children }: NavigationLinkProps) => {
  const activeHeading = useActiveHeading();
  const { setIsOpen } = useIsSidebarStore();

  const isActive = activeHeading?.id === href.slice(1);

  const styles = cn(
    'inline-flex w-full border-l-2 border-text-100 py-2 pl-4 pr-2',
    isActive && 'border-brand-600 bg-brand-600/10'
  );

  return (
    <a
      href={href}
      className={styles}
      onClick={() => setIsOpen(false)}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </a>
  );
};

const TocGroup = ({ headingData }: { headingData: IMdxHeading }) => {
  if (headingData.hasChildren()) {
    return (
      <li>
        <details className='group/details'>
          <summary className='mdx-scroll-fade-in-out cursor-pointer  bg-text-50 px-2 '>
            <div className='   flex items-center'>
              {headingData.text}{' '}
              <ChevronDown
                className='ml-auto py-2 transition-all duration-367 group-open/details:rotate-180'
                size='2rem'
              />
            </div>
          </summary>
          <ul className='relative mt-4'>
            {Array.from(headingData.children.values()).map(child => (
              <TocGroup key={child.id} headingData={child} />
            ))}
          </ul>
        </details>
      </li>
    );
  }

  return (
    <li className='mdx-scroll-fade-in-out  '>
      <TocLink href={`#${headingData.id}`}>{headingData.text}</TocLink>
    </li>
  );
};

export interface MdxTocProps extends HTMLAttributes<HTMLDivElement> {}

function MdxToc(props: MdxTocProps) {
  const headingsMap = useHeadings({ minLevel: 2, maxLevel: 3 });

  const headingsData = useMemo(
    () =>
      Array.from(headingsMap?.values() ?? []).filter(heading =>
        document.getElementById(heading.id)
      ),
    [headingsMap]
  );

  return (
    <nav
      aria-label='Table Of Content'
      className='relative flex-col overflow-y-visible py-4 text-sm '
      {...props}
    >
      <ul className='mx-2 flex flex-col gap-1'>
        {headingsData.map(headingsData => (
          <TocGroup key={headingsData.id} headingData={headingsData} />
        ))}
      </ul>
    </nav>
  );
}

export default function FakeMdxToc(props: MdxTocProps) {
  const pathName = usePathname();
  const params = useParams();
  return <MdxToc key={`${pathName}-${params.locale}`} {...props} />;
}
