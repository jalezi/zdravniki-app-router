'use client';

import { useEffect, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { Hamburger, HamburgerRef } from '@/components/header/hamburger';
import { Overlay } from '@/components/ui/overlay';
import { NavLink } from '@/components/header/nav-link';

const MEDIUM_BREAKPOINT = 768;

const navVariants = cva(
  'fixed -right-[100%] px-[0.875rem] top-0 left-[100%] flex z-50 bg-brand-500 flex-col transition-all duration-650 min-h-[100svh] md:ml-auto md:relative md:flex-row md:inset-[unset] md:flex md:top-0 md:min-h-[unset] md:items-center md:bg-transparent md:duration-0',
  {
    variants: {
      variant: {
        mobileHidden: '',
        mobileVisible: 'left-[20%] right-0 sm:left-[35%]',
      },
    },
  }
);

const listVariants = cva(
  'flex flex-col gap-6 text-[0.875rem] md:flex-row md:pointer-events-auto',
  {
    variants: {
      variant: {
        mobileHidden: 'pointer-events-none',
        mobileVisible: 'pointer-events-auto',
      },
    },
  }
);

const Nav = () => {
  const locale = useCurrentLocale();
  const hamburger = useRef<HamburgerRef>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(hamburger.current?.isMenuOpen);

  const t = useScopedI18n('navLinks');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MEDIUM_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleHamburgerClick = () => {
    hamburger.current?.toggleMenu();
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <Overlay isVisible={isMenuOpen ? true : undefined} />
      <Hamburger ref={hamburger} onClick={handleHamburgerClick} />
      <nav
        className={cn(
          navVariants({
            variant: isMenuOpen ? 'mobileVisible' : 'mobileHidden',
          })
        )}
      >
        <h2 className='flex h-12 items-center md:hidden'>{t('menu')}</h2>
        <ul
          className={cn(
            listVariants({
              variant: isMenuOpen ? 'mobileVisible' : 'mobileHidden',
            })
          )}
        >
          <li className=''>
            <NavLink href={`/${locale}`}>{t('home.label')}</NavLink>
          </li>
          <li>
            <NavLink href={`/${locale}/${t('faq.slug')}`}>
              {t('faq.label')}
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${locale}/${t('about.slug')}`}>
              {t('about.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`https://covid-19.sledilnik.org/${locale}/donate`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('donate.label')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`https://covid-19.sledilnik.org/${locale}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('sledilnik.label')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
