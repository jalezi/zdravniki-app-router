import { getScopedI18n } from '@/locales/server';

import SkipLink from './SkipLink';
import { TocSkipLinks } from './TocSkipLinks';

export default async function SkipLinks() {
  const t = await getScopedI18n('skipLinks');

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
      <TocSkipLinks />
    </ul>
  );
}
