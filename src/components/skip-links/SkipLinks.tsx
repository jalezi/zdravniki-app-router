import { headers } from 'next/headers';

import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import { ROUTES_TRANSLATIONS } from 'rewrites-redirects.config.mjs';

import SkipLink from './SkipLink';

export default async function SkipLinks() {
  const t = await getScopedI18n('skipLinks');
  const locale = getCurrentLocale();
  const pathnameTranslations = ROUTES_TRANSLATIONS[locale];
  const pathname = headers().get('x-pathname');

  const hasToc =
    pathname &&
    [pathnameTranslations.about, pathnameTranslations.faq].some(path =>
      pathname.includes(path)
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
