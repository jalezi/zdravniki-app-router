import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {}

export default async function Header({ className, ...props }: HeaderProps) {
  const locale = getCurrentLocale();
  const t = await getScopedI18n('navLinks');
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
            {t('home')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            {t('faq')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            {t('about')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            {t('donate')}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}`} hrefLang={locale}>
            {t('sledilnik')}
          </Link>
        </li>
      </ul>
    </header>
  );
}
