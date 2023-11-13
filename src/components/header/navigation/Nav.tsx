'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { Hamburger, HamburgerRef } from '@/components/header/hamburger';
import { Overlay } from '@/components/ui/overlay';
import { NavLink } from '@/components/header/link';
import { FacebookIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import SocialLink from '../link/SocialLink';

const MEDIUM_BREAKPOINT = 768;

const Nav = () => {
  const locale = useCurrentLocale();
  const hamburgerRef = useRef<HamburgerRef>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(
    hamburgerRef.current?.isMenuOpen
  );

  const t = useScopedI18n('navLinks');

  useLayoutEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsMenuOpen(false);
        hamburgerRef.current?.closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    if (window.innerWidth > MEDIUM_BREAKPOINT) {
      setIsMenuOpen(false);
      hamburgerRef.current?.closeMenu();

      const links = navRef.current?.querySelectorAll('a');
      links &&
        [...links].forEach(link => {
          link.removeAttribute('tabindex');
        });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const links = navRef.current?.querySelectorAll('a');
    links &&
      [...links].forEach(link => {
        link.removeAttribute('tabindex');
      });

    const handleResize = () => {
      if (window.innerWidth > MEDIUM_BREAKPOINT) {
        setIsMenuOpen(false);
        hamburgerRef.current?.closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleHamburgerClick = () => {
    hamburgerRef.current?.toggleMenu();
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <Overlay isVisible={isMenuOpen ? true : undefined} />
      <Hamburger ref={hamburgerRef} onClick={handleHamburgerClick} />
      <nav ref={navRef} className={cn('nav-main', isMenuOpen ? 'open' : '')}>
        <h2 className='flex h-12 items-center font-medium md:hidden'>
          {t('menu')}
        </h2>
        <ul className='nav-links-main'>
          <li>
            <NavLink href={`/${locale}`} tabIndex={isMenuOpen ? undefined : -1}>
              {t('home.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${locale}/${t('faq.slug')}`}
              tabIndex={isMenuOpen ? undefined : -1}
            >
              {t('faq.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${locale}/${t('about.slug')}`}
              tabIndex={isMenuOpen ? undefined : -1}
            >
              {t('about.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`https://covid-19.sledilnik.org/${locale}/donate`}
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={isMenuOpen ? undefined : -1}
            >
              {t('donate.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`https://covid-19.sledilnik.org/${locale}`}
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={isMenuOpen ? undefined : -1}
            >
              {t('sledilnik.label')}
            </NavLink>
          </li>
        </ul>
        <ul className='nav-links-social'>
          <li>
            <SocialLink
              href='https://facebook.com/sledilnik'
              label='Facebook'
              icon={<FacebookIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
            />
          </li>
          <li>
            <SocialLink
              href='https://twitter.com/sledilnik'
              label='Twitter'
              icon={<TwitterIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
            />
          </li>
          <li>
            <SocialLink
              href='https://github.com/jalezi/'
              label='Github'
              icon={<GithubIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
