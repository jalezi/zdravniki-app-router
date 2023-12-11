'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { FocusOn } from 'react-focus-on';

import { Hamburger, HamburgerRef } from '@/components/header/hamburger';
import { Overlay } from '@/components/ui/overlay';
import { useEscapeKey } from '@/lib/hooks';
import { useIsSidebarStore } from '@/lib/store';

import Links from './Links';

const MEDIUM_BREAKPOINT = 768;

const Nav = () => {
  const hamburgerRef = useRef<HamburgerRef>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(
    hamburgerRef.current?.isMenuOpen
  );
  const { setIsOpen: setIsSidebarOpen } = useIsSidebarStore();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    hamburgerRef.current?.closeMenu();
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  useEscapeKey(closeMenu);

  // set isMenuOpen to false on desktop
  useLayoutEffect(() => {
    if (window.innerWidth <= MEDIUM_BREAKPOINT) {
      return;
    }
    setIsSidebarOpen(false);
    closeMenu();
  }, [closeMenu, setIsSidebarOpen]);

  // close menu on resize if on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= MEDIUM_BREAKPOINT) {
        return;
      }
      const links = navRef.current?.querySelectorAll('a');
      links &&
        [...links].forEach(link => {
          link.removeAttribute('tabindex');
        });
      setIsSidebarOpen(false);
      setIsMenuOpen(false);
      hamburgerRef.current?.closeMenu();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsSidebarOpen]);

  const handleHamburgerClick = () => {
    hamburgerRef.current?.toggleMenu();
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <Overlay isVisible={isMenuOpen ? true : undefined} inset='menu' />
      <FocusOn
        enabled={!!isMenuOpen}
        onEscapeKey={closeMenu}
        onClickOutside={closeMenu}
        className='relative z-[9990] ml-auto'
        returnFocus={true}
      >
        <Hamburger ref={hamburgerRef} onClick={handleHamburgerClick} />
        <Links ref={navRef} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      </FocusOn>
    </>
  );
};

export default Nav;
