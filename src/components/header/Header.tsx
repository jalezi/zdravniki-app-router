import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import { getCurrentLocale } from '@/locales/server';
import { Nav } from './navigation';
import { I18nProviderClient } from '@/locales/client';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {}

export default async function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();

  const headerDefaultStyles = cn(
    className,
    'flex h-12 items-center bg-brand-500 px-4 dark:bg-brand-500 '
  );

  return (
    <header className={headerDefaultStyles} {...props}>
      <Link href={`/${locale}`} hrefLang={locale}>
        <Logo className='text-sm' aria-label='logo' />
      </Link>
      <I18nProviderClient locale={locale}>
        <Nav />
      </I18nProviderClient>
    </header>
  );
}
