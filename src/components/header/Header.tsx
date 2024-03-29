import { HTMLAttributes } from 'react';

import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';

import { Navigation } from './navigation';
import { InternalLink } from '../links';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default async function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();

  const headerDefaultStyles = cn(
    className,
    ' flex h-12 items-center mx-auto max-w-7xl  bg-brand-500  dark:bg-brand-500 md:h-16 isolate'
  );

  return (
    <div
      id='header-wrapper'
      className='fixed left-0 top-0 z-50 w-full bg-brand-500 px-4  '
    >
      <header
        id='top-header'
        aria-label='Top Level Header'
        className={headerDefaultStyles}
        {...props}
      >
        <InternalLink variant='logo' href={`/${locale}/`} hrefLang={locale}>
          <span id='aria-logo' className='sr-only'>
            logo
          </span>
          <Logo className='text-sm' aria-labelledby='aria-logo' />
        </InternalLink>
        <Navigation />
      </header>
    </div>
  );
}
