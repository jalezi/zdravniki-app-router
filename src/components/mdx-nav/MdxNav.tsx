'use client';

import { LinkHTMLAttributes, PropsWithChildren, useMemo } from 'react';

import { useParams, usePathname } from 'next/navigation';

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
        className='grow py-2 pl-2  transition-all duration-367 ease-in-out hover:bg-brand-100 data-[active]:underline data-[active]:decoration-brand-500 data-[active]:decoration-4 data-[active]:underline-offset-4'
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
      <li className='flex grow'>
        <NavigationMenu.Sub
          value={firstChild.id}
          className='relative flex grow px-2 text-sm child:grow'
          orientation='vertical'
        >
          <NavigationMenu.List className=' relative flex grow flex-col'>
            <NavigationMenu.Item className='flex grow'>
              <NavigationLink href={`#${headingData.id}`}>
                {headingData.text}
              </NavigationLink>
            </NavigationMenu.Item>
            <ul className='relative flex grow flex-col gap-2 py-2 pl-2'>
              {Array.from(headingData.children.values()).map(child => (
                <MdxHeading key={child.id} headingData={child} />
              ))}
            </ul>
          </NavigationMenu.List>
        </NavigationMenu.Sub>
      </li>
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
    () =>
      Array.from(headingsMap?.values() ?? []).filter(heading =>
        document.getElementById(heading.id)
      ),
    [headingsMap]
  );

  return (
    <NavigationMenu.Root
      className='relative z-[9999] flex justify-center bg-brand-50 text-sm child:grow'
      orientation='vertical'
      aria-label='Content Navigation'
    >
      <NavigationMenu.List className='flex'>
        <NavigationMenu.Item className='flex max-h-[2.75rem] grow border-b-2 border-b-brand-100 p-2'>
          <NavigationMenu.Trigger className='group flex grow items-center justify-between gap-2  px-4 py-1'>
            Kazalo{' '}
            <ChevronDown
              size='14'
              className='transition-transform duration-367 ease-in group-data-[state=open]:-rotate-180'
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='max-h-[calc(100svh-10rem)] w-full overflow-auto '>
            <ul className=' relative flex grow flex-col px-2 py-2'>
              {headingsData.map(headingData => (
                <MdxHeading key={headingData.id} headingData={headingData} />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className='absolute left-0 top-[2.75rem] w-full overflow-hidden bg-brand-50' />
    </NavigationMenu.Root>
  );
};

const FakeMdxNav = () => {
  const pathName = usePathname();
  const params = useParams();
  return <MdxNav key={`${pathName}-${params.locale}`} />;
};

export default FakeMdxNav;
