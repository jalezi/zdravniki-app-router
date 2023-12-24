import React, { forwardRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FacebookIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import { ROUTES_TRANSLATIONS } from '@/lib/constants/segments';
import { cn } from '@/lib/utils';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { LanguageSelector } from '../language-selector';
import { NavLink, SocialLink } from '../link';

type LinksProps = {
  isMenuOpen: boolean | undefined;
  closeMenu: () => void;
};

const Links = forwardRef<HTMLDivElement, LinksProps>(
  ({ isMenuOpen, closeMenu }, ref) => {
    const locale = useCurrentLocale();
    const currentPathname = usePathname();
    const t = useScopedI18n('navLinks');

    const aboutSegment = ROUTES_TRANSLATIONS[locale].about;
    const faqSegment = ROUTES_TRANSLATIONS[locale].faq;

    const heading = cn(
      'flex h-12 items-center font-medium md:hidden transition-[visibility] duration-0 ease-linear',
      isMenuOpen ? 'visible' : 'invisible delay-500'
    );

    return (
      <nav
        id='nav-main'
        ref={ref}
        aria-label='Main'
        className={cn('nav-main', isMenuOpen ? 'open' : '')}
      >
        <span className={heading}>{t('menu')}</span>
        <ul className='nav-links-main'>
          <li>
            <NavLink
              as={Link}
              href={`/${locale}/`}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              className={
                currentPathname === `/${locale}/` ? 'active' : undefined
              }
              aria-current={
                currentPathname === `/${locale}/` ? 'page' : undefined
              }
            >
              {t('home.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              href={`/${locale}/${faqSegment}/`}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              className={
                currentPathname === `/${locale}/${faqSegment}/`
                  ? 'active'
                  : undefined
              }
              aria-current={
                currentPathname === `/${locale}/${faqSegment}/`
                  ? 'page'
                  : undefined
              }
            >
              {t('faq.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              href={`/${locale}/${aboutSegment}/`}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              className={
                currentPathname === `/${locale}/${aboutSegment}/`
                  ? 'active'
                  : undefined
              }
              aria-current={
                currentPathname === `/${locale}/${aboutSegment}/`
                  ? 'page'
                  : undefined
              }
            >
              {t('about.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as='a'
              href={`https://covid-19.sledilnik.org/${locale}/donate`}
              target='_blank'
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              rel='noopener'
            >
              {t('donate.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as='a'
              href={`https://covid-19.sledilnik.org/${locale}`}
              target='_blank'
              rel='noopener'
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            >
              {t('sledilnik.label')}
            </NavLink>
          </li>
        </ul>
        <ul className='nav-links-social'>
          <li>
            <SocialLink
              variant='header'
              href='https://facebook.com/sledilnik'
              aria-label='Facebook'
              icon={<FacebookIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            />
          </li>
          <li>
            <SocialLink
              variant='header'
              href='https://twitter.com/sledilnik'
              aria-label='Twitter'
              icon={<TwitterIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            />
          </li>
          <li>
            <SocialLink
              variant='header'
              href='https://github.com/jalezi/'
              aria-label='Github'
              icon={<GithubIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            />
          </li>
          <li className='ml-auto md:ml-2'>
            <LanguageSelector id='lang-selector' />
          </li>
        </ul>
      </nav>
    );
  }
);

export default Links;

Links.displayName = 'Links';
