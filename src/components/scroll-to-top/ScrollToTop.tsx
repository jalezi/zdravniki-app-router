'use client';

import { useEffect, useState, useCallback, HTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';

import { ChevronUpIcon } from '../icons';

const buttonVariants = cva(
  'transition-all duration-367 grid place-items-center',
  {
    variants: {
      variant: {
        icon: ' w-12 aspect-square rounded-full bg-brand-300 hover:bg-brand-500',
        text: 'relative lowercase font-semibold hover:opacity-75 md:grid',
      },
      position: {
        fixed: 'fixed bottom-8 z-[45]',
        relative: 'relative',
      },
      notVisiblePosition: {
        default: '',
        right_24: '-right-24',
        right_full: '-right-[100%]',
      },
      hiddenOn: {
        default: 'hidden',
        md: 'md:hidden',
      },
      visibleOn: {
        default: 'grid',
        md: 'md:grid',
      },
    },
    defaultVariants: {
      variant: 'icon',
      position: 'fixed',
      hiddenOn: 'default',
      visibleOn: 'default',
      notVisiblePosition: 'default',
    },
    compoundVariants: [
      {
        variant: 'text',
        position: 'relative',
        className: 'invisible',
      },
    ],
  }
);

export interface ScrollToTopProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  offset: number;
  element?: HTMLElement | null;
}

const ScrollToTop = ({
  offset,
  element,
  className,
  variant,
  position,
  notVisiblePosition,
  hiddenOn,
  visibleOn,
  ...props
}: ScrollToTopProps) => {
  const t = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  const getScrollY = useCallback(() => {
    return element ? element.scrollTop : window.scrollY;
  }, [element]);

  const scrollToTop = () => {
    const scrollOptions = {
      top: 0,
      behavior: 'smooth',
    } as const;
    if (element) {
      element.scrollTo(scrollOptions);
    } else {
      window.scrollTo(scrollOptions);
    }
  };

  const toggleVisibility = useCallback(() => {
    if (getScrollY() > offset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [getScrollY, offset]);

  useEffect(() => {
    const scrollElement = element ? element : window;
    scrollElement.addEventListener('scroll', toggleVisibility);
    return () => scrollElement.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility, element]);

  const icon = !variant || variant === 'icon' ? <ChevronUpIcon /> : null;
  const text = variant === 'text' ? t('scrollToTop') : null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        buttonVariants({
          variant,
          position,
          notVisiblePosition,
          hiddenOn,
          visibleOn,
          className,
        }),
        isVisible && icon && 'right-8',
        isVisible && text && 'visible'
      )}
      aria-label={icon ? t('scrollToTop') : undefined}
      {...props}
    >
      {icon}
      {text}
    </button>
  );
};

export default ScrollToTop;
