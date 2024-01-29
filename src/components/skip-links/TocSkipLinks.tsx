'use client';

import { usePathname } from 'next/navigation';

import { useScopedI18n } from '@/locales/client';

import SkipLink from './SkipLink';

const SEGMENTS = {
  faq: 'faq',
  'pogosta-vprasanja': 'faq',
  'domande-frequenti': 'faq',
  about: 'about',
  'o-projektu': 'about',
  'il-progetto': 'about',
} as const;

export const TocSkipLinks = function TocSkipLinks() {
  const t = useScopedI18n('skipLinks');
  const pathname = usePathname();

  const hasToc =
    pathname && Object.keys(SEGMENTS).some(path => pathname.includes(path));

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
