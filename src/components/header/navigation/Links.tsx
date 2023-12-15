import React, { forwardRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FacebookIcon, GithubIcon, TwitterIcon } from '@/components/icons';
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

    const heading = cn(
      'flex h-12 items-center font-medium md:hidden transition-[visibility] duration-0 ease-linear',
      isMenuOpen ? 'visible' : 'invisible delay-500'
    );

    return (
      <nav ref={ref} className={cn('nav-main', isMenuOpen ? 'open' : '')}>
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
            >
              {t('home.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              href={`/${locale}/${t('faq.slug')}/`}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              className={
                currentPathname === `/${locale}/${t('faq.slug')}/`
                  ? 'active'
                  : undefined
              }
            >
              {t('faq.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              href={`/${locale}/${t('about.slug')}/`}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
              className={
                currentPathname === `/${locale}/${t('about.slug')}/`
                  ? 'active'
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
            >
              {t('donate.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              as='a'
              href={`https://covid-19.sledilnik.org/${locale}`}
              target='_blank'
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
            <LanguageSelector />
          </li>
        </ul>
      </nav>
    );
  }
);

export default Links;

Links.displayName = 'Links';
