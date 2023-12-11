import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';

import { Navigation } from './navigation';

export interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {}

export default async function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();

  const headerDefaultStyles = cn(
    className,
    'sticky z-50 top-0 left-0 flex h-12 items-center bg-brand-500 px-4 dark:bg-brand-500 md:h-16 isolate'
  );

  return (
    <header id='top-header' className={headerDefaultStyles} {...props}>
      <Link href={`/${locale}`} hrefLang={locale}>
        <span id='aria-logo' className='sr-only'>
          logo
        </span>
        <Logo className='text-sm' aria-labelledby='aria-logo' />
      </Link>
      <Navigation />
    </header>
  );
}
