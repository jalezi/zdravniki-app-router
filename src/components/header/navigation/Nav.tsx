'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Hamburger, HamburgerRef } from '@/components/header/hamburger';
import { NavLink } from '@/components/header/link';
import { FacebookIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import { Overlay } from '@/components/ui/overlay';
import { useEscapeKey } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { LanguageSelector } from '../language-selector';
import SocialLink from '../link/SocialLink';

const MEDIUM_BREAKPOINT = 768;

const Nav = () => {
  const locale = useCurrentLocale();
  const currentPathname = usePathname();
  const hamburgerRef = useRef<HamburgerRef>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(
    hamburgerRef.current?.isMenuOpen
  );

  const t = useScopedI18n('navLinks');

  const closeMenu = () => {
    setIsMenuOpen(false);
    hamburgerRef.current?.closeMenu();
  };

  useEscapeKey(closeMenu);

  // remove tabindex from links when menu is closed on desktop
  useLayoutEffect(() => {
    if (window.innerWidth > MEDIUM_BREAKPOINT) {
      closeMenu();

      const links = navRef.current?.querySelectorAll('a');
      links &&
        [...links].forEach(link => {
          link.removeAttribute('tabindex');
        });
    }
  }, []);

  useLayoutEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // remove tabindex from links when user resize
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

  const heading = cn(
    'flex h-12 items-center font-medium md:hidden transition-[visibility] duration-0 ease-linear',
    isMenuOpen ? 'visible' : 'invisible delay-500'
  );

  return (
    <>
      <Overlay isVisible={isMenuOpen ? true : undefined} />
      <Hamburger ref={hamburgerRef} onClick={handleHamburgerClick} />
      <nav ref={navRef} className={cn('nav-main', isMenuOpen ? 'open' : '')}>
        <h2 className={heading}>{t('menu')}</h2>
        <ul className='nav-links-main'>
          <li>
            <NavLink
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
              href='https://facebook.com/sledilnik'
              label='Facebook'
              icon={<FacebookIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            />
          </li>
          <li>
            <SocialLink
              href='https://twitter.com/sledilnik'
              label='Twitter'
              icon={<TwitterIcon />}
              tabIndex={isMenuOpen ? undefined : -1}
              onClick={closeMenu}
            />
          </li>
          <li>
            <SocialLink
              href='https://github.com/jalezi/'
              label='Github'
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
    </>
  );
};

export default Nav;
