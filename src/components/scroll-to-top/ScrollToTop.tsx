'use client';

import { useEffect, useState, useCallback } from 'react';

import { cva } from 'class-variance-authority';
import { ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';

const buttonVariants = cva(
  'fixed -right-24 bottom-8 z-[45] transition-all duration-367 w-12 aspect-square rounded-full grid place-items-center bg-brand-300 hover:bg-brand-500 '
);

const ScrollToTop = ({
  offset,
  element,
}: {
  offset: number;
  element?: HTMLElement | null;
}) => {
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

  return (
    <button
      onClick={scrollToTop}
      className={cn(buttonVariants(), isVisible && 'right-8')}
      aria-label={t('scrollToTop')}
    >
      <ChevronUp />
    </button>
  );
};

export default ScrollToTop;
