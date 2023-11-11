'use client';

import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';

const ANIMATION_DURATION = 600;
const MEDIUM_BREAKPOINT = 768;

export interface HamburgerProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export type HamburgerRef = {
  button: HTMLButtonElement | null;
  hamburger: HTMLSpanElement | null;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  isMenuOpen: boolean;
};

const Hamburger = forwardRef<HamburgerRef, HamburgerProps>(
  ({ onClick, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hamburgerRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      button: buttonRef.current,
      hamburger: hamburgerRef.current,
      toggleMenu: () => setIsMenuOpen(prev => !prev),
      openMenu: () => setIsMenuOpen(true),
      closeMenu: () => setIsMenuOpen(false),
      isMenuOpen,
    }));

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
          setIsMenuOpen(false);
        }
      };

      const handleResize = () => {
        if (window.innerWidth > MEDIUM_BREAKPOINT) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      document.addEventListener('keydown', handleEscape);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('keydown', handleEscape);
      };
    });

    const handleClick = () => {
      setIsMenuOpen(prev => !prev);
    };

    if (hamburgerRef.current && isMenuOpen) {
      hamburgerRef.current.classList.add('cross');
    }

    if (hamburgerRef.current && !isMenuOpen) {
      if (hamburgerRef.current.classList.contains('cross')) {
        hamburgerRef.current.classList.add('bars');
        hamburgerRef.current.classList.remove('cross');
        setTimeout(() => {
          hamburgerRef.current!.classList.remove('bars');
        }, ANIMATION_DURATION);
      }
    }

    return (
      <button
        ref={buttonRef}
        onClick={onClick ? onClick : handleClick}
        className='z-[9990] ml-auto grid h-6 w-6 items-center md:hidden'
        {...props}
      >
        <span ref={hamburgerRef} className='hamburger block cursor-pointer '>
          <span className='hamburger-line block' />
          <span className='hamburger-line block' />
          <span className='hamburger-line block' />
        </span>
      </button>
    );
  }
);

Hamburger.displayName = 'Hamburger';

export default Hamburger;
