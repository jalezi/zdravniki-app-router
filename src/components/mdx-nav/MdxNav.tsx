'use client';

import { LinkHTMLAttributes, PropsWithChildren, useMemo } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';

import { MdxHeading as IMdxHeading, useHeadings } from './hooks';

interface NavigationLinkProps
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren<{}> {
  href: string;
}

const NavigationLink = ({ href, children }: NavigationLinkProps) => {
  const hash = decodeURI(document.location.hash);

  return (
    <NavigationMenu.Link asChild active={hash === href}>
      <a
        href={href}
        className='grow px-2 py-2 hover:bg-brand-50 data-[active]:underline data-[active]:underline-offset-4'
      >
        {children}
      </a>
    </NavigationMenu.Link>
  );
};

const MdxHeading = ({ headingData }: { headingData: IMdxHeading }) => {
  if (headingData.hasChildren()) {
    const firstChild = headingData.children.values().next().value;

    return (
      <NavigationMenu.Sub
        value={firstChild.id}
        className='relative flex grow bg-white text-sm child:grow'
        orientation='vertical'
      >
        <NavigationMenu.List className=' relative flex grow flex-col '>
          <NavigationMenu.Item className='flex grow'>
            <NavigationLink href={`#${headingData.id}`}>
              {headingData.text}
            </NavigationLink>
          </NavigationMenu.Item>
          <ul className='relative flex grow flex-col gap-2 px-2 py-2'>
            {Array.from(headingData.children.values()).map(child => (
              <MdxHeading key={child.id} headingData={child} />
            ))}
          </ul>
        </NavigationMenu.List>
      </NavigationMenu.Sub>
    );
  }

  return (
    <li className='flex grow'>
      <NavigationLink href={`#${headingData.id}`}>
        {headingData.text}
      </NavigationLink>
    </li>
  );
};

const MdxNav = () => {
  const headingsMap = useHeadings({ minLevel: 2, maxLevel: 3 });

  const headingsData = useMemo(
    () => Array.from(headingsMap?.values() ?? []),
    [headingsMap]
  );

  return (
    <NavigationMenu.Root
      className='relative z-[9999] flex justify-center bg-brand-50 text-sm child:grow'
      orientation='vertical'
      aria-label='Content Navigation'
    >
      <NavigationMenu.List className='flex'>
        <NavigationMenu.Item className='flex grow'>
          <NavigationMenu.Trigger className='group flex grow items-center justify-between gap-2 px-4 py-2'>
            Kazalo{' '}
            <ChevronDown
              size='14'
              className='transition-transform duration-367 ease-in group-data-[state=open]:-rotate-180'
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='w-full'>
            <ul className=' relative flex grow flex-col px-2 py-2'>
              {headingsData.map(headingData => (
                <li key={headingData.id} className='flex grow'>
                  <MdxHeading key={headingData.id} headingData={headingData} />
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className='bg-yellow-300 data-[orientaition=horizontal]:h-1' />
      </NavigationMenu.List>
      <NavigationMenu.Viewport className='absolute left-5 right-5 top-20 max-h-[calc(100svh-12rem)] overflow-y-auto border border-gray-400 bg-white ' />
    </NavigationMenu.Root>
  );
};

export default MdxNav;
