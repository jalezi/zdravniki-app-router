'use client';

import { LinkHTMLAttributes, PropsWithChildren, useMemo } from 'react';

import { MdxHeading as IMdxHeading, useHeadings } from './hooks';

interface NavigationLinkProps
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren<{}> {
  href: string;
}

const TocLink = ({ href, children }: NavigationLinkProps) => {
  return (
    <a href={href} className='inline-flex'>
      {children}
    </a>
  );
};

const TocGroup = ({ headingData }: { headingData: IMdxHeading }) => {
  if (headingData.hasChildren()) {
    // const firstChild = headingData.children.values().next().value;

    return (
      <li className=''>
        <div>{headingData.text}</div>
        <ul className='relative flex  flex-col gap-2 border-l-2 border-brand-200 py-2 pl-2'>
          {Array.from(headingData.children.values()).map(child => (
            <TocGroup key={child.id} headingData={child} />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className='flex grow'>
      <TocLink href={`#${headingData.id}`}>{headingData.text}</TocLink>
    </li>
  );
};

export default function MdxToc() {
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
      className='relative flex flex-col overflow-auto text-sm'
    >
      <ul className='flex flex-col gap-2 py-2 pl-2'>
        {headingsData.map(headingsData => (
          <TocGroup key={headingsData.id} headingData={headingsData} />
        ))}
      </ul>
    </nav>
  );
}
