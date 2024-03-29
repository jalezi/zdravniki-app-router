'use client';

import {
  HTMLAttributes,
  LinkHTMLAttributes,
  PropsWithChildren,
  useMemo,
} from 'react';

import { useParams, usePathname } from 'next/navigation';

import { useIsSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';

import {
  MdxHeading as IMdxHeading,
  useActiveHeading,
  useHeadings,
} from './hooks';
import { ChevronDownIcon } from '../icons';

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
      <li className='last-of-type:mb-8'>
        <details className='group/details'>
          <summary className='cursor-pointer  bg-text-50 px-2 '>
            <div className='   flex items-center'>
              {headingData.text}{' '}
              <ChevronDownIcon className='ml-auto py-2 text-[2rem] transition-all duration-367 group-open/details:rotate-180' />
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
    <li>
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
  const params = useParams();
  const pathname = usePathname();
  const isFaq =
    pathname.includes('faq') ||
    pathname.includes('pogosta-vprasanja') ||
    pathname.includes('domande-frequenti');
  const isAbout =
    pathname.includes('about') ||
    pathname.includes('o-projektu') ||
    pathname.includes('il-progetto');

  const segmentKey = isFaq ? 'faq' : isAbout ? 'about' : 'default';
  return <MdxToc key={`${segmentKey}-${params.locale}`} {...props} />;
}
