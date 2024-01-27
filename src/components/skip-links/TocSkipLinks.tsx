'use client';

import { usePathname } from 'next/navigation';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { ROUTES_TRANSLATIONS } from 'rewrites-redirects.config.mjs';

import SkipLink from './SkipLink';

export const TocSkipLinks = function TocSkipLinks() {
  const t = useScopedI18n('skipLinks');
  const locale = useCurrentLocale();
  const pathnameTranslations = ROUTES_TRANSLATIONS[locale];
  const pathname = usePathname();

  const hasToc =
    pathname &&
    [pathnameTranslations.about, pathnameTranslations.faq].some(path =>
      pathname.includes(path)
    );

  if (!hasToc) return null;

  return (
    <>
      <li className='md:hidden'>
        <SkipLink href='#sidebar-toggle'>{t('tocToggler')}</SkipLink>
      </li>
      <li className='hidden md:list-item'>
        <SkipLink href='#desktop-toc-nav'>{t('toc')}</SkipLink>
      </li>
    </>
  );
};

export default TocSkipLinks;
