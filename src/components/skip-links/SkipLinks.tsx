'use client';
import { usePathname } from 'next/navigation';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { ROUTES_TRANSLATIONS } from 'rewrites-redirects.config.mjs';

import SkipLink from './SkipLink';

export default function SkipLinks() {
  const t = useScopedI18n('skipLinks');
  const locale = useCurrentLocale();
  const pathnameTranslations = ROUTES_TRANSLATIONS[locale];
  const canonicalPathname = usePathname();
  const hasToc =
    canonicalPathname &&
    [pathnameTranslations.about, pathnameTranslations.faq].some(path =>
      canonicalPathname.includes(path)
    );

  return (
    <ul id='nav-access' className='fixed -top-80 z-[10000] w-full'>
      <li>
        <SkipLink className='md:hidden' href='#nav-main-toggler'>
          {t('menuToggler')}
        </SkipLink>
      </li>
      <li className='hidden md:list-item'>
        <SkipLink href='#lang-selector'>{t('langSelector')}</SkipLink>
      </li>
      <li>
        <SkipLink href='#content'>{t('main')}</SkipLink>
      </li>
      {hasToc ? (
        <>
          <li className='md:hidden'>
            <SkipLink href='#sidebar-toggle'>{t('tocToggler')}</SkipLink>
          </li>
          <li className='hidden md:list-item'>
            <SkipLink href='#desktop-toc-nav'>{t('toc')}</SkipLink>
          </li>
        </>
      ) : null}
    </ul>
  );
}
