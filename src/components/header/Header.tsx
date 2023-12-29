import { HTMLAttributes } from 'react';

import { headers } from 'next/headers';
import Link from 'next/link';

import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';

import { Navigation } from './navigation';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default async function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();
  const headerList = headers();
  const pathname = headerList.get('x-canonical-pathname');

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
        <Link
          href={`/${locale}`}
          hrefLang={locale}
          aria-current={pathname === `/${locale}/` ? 'page' : undefined}
        >
          <span id='aria-logo' className='sr-only'>
            logo
          </span>
          <Logo className='text-sm' aria-labelledby='aria-logo' />
        </Link>
        <Navigation />
      </header>
    </div>
  );
}
