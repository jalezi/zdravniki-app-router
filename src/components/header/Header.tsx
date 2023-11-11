import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import { getCurrentLocale } from '@/locales/server';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {}

export default function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();
  const headerDefaultStyles = cn(
    className,
    'flex h-12 items-center bg-brand-500 px-4 dark:bg-brand-500 '
  );

  return (
    <header className={headerDefaultStyles} {...props}>
      <ul className='flex grow items-center gap-6 text-[0.875rem]'>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            <Logo className='text-sm' aria-label='logo' />
          </Link>
        </li>
        <li className='ml-auto'>
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            className={buttonVariants({ variant: 'link' })}
          >
            Imenik
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            Pojasnila
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            O projektu
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            Podpri!
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            Sledilnik.org
          </Link>
        </li>
      </ul>
    </header>
  );
}
