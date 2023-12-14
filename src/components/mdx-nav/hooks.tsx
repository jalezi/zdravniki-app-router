'use client';

import { useEffect, useState } from 'react';

export interface MdxHeading {
  id: string;
  text: string;
  level: number;
  paddingLevel: number;
  hasChildren(): boolean;
  children: Map<string, MdxHeading>;
  parent: MdxHeading | null;
}

interface HeadingOptions {
  minLevel?: number;
  maxLevel?: number;
}

const initialHeading: MdxHeading = {
  id: '',
  text: 'root',
  level: 0,
  paddingLevel: -1,
  hasChildren() {
    return this.children.size > 0;
  },
  children: new Map<string, MdxHeading>(),
  parent: null,
};

export const useHeadings = (
  options: HeadingOptions = { minLevel: 1, maxLevel: 6 },
  element?: HTMLElement | Document
) => {
  const [headingsMap, setHeadingsMap] = useState<Map<string, MdxHeading>>(
    new Map()
  );

  const { minLevel = 1, maxLevel = 6 } = options;

  const selector = Array.from({ length: maxLevel - minLevel + 1 })
    .map((_, i) => `h${i + minLevel}`)
    .join(', ');

  useEffect(() => {
    if (!document) {
      return;
    }

    const el = element ?? document;

    const headings = el.querySelectorAll(selector);
    const headingMap = new Map<string, MdxHeading>();
    headingMap.set('root', { ...initialHeading });
    let currentHeading = headingMap.get('root') ?? { ...initialHeading };
    let previousHeading = headingMap.get('root') ?? { ...initialHeading };

    for (const heading of headings) {
      const { textContent, nodeName, id } = heading;
      const level = Number(nodeName.charAt(1));
      const paddingLevel = level - minLevel;

      if (!textContent) {
        continue;
      }

      const common = {
        ...initialHeading,
        id,
        text: textContent,
        level,
        paddingLevel,
        children: new Map(),
      } satisfies Omit<MdxHeading, 'parent'>;

      if (level > currentHeading.level) {
        currentHeading.children.set(textContent, {
          ...common,
          parent: currentHeading,
        });

        previousHeading = currentHeading;
        currentHeading = currentHeading.children.get(textContent) as MdxHeading;

        continue;
      }
      if (level === currentHeading.level) {
        previousHeading.children.set(textContent, {
          ...common,
          parent: previousHeading,
        });

        currentHeading = previousHeading.children.get(
          textContent
        ) as MdxHeading;

        continue;
      }
      if (level < currentHeading.level) {
        previousHeading?.parent?.children.set(textContent, {
          ...common,
          parent: previousHeading?.parent ?? null,
        });

        previousHeading = previousHeading?.parent ?? { ...initialHeading };
        currentHeading = previousHeading?.children.get(
          textContent
        ) as MdxHeading;

        continue;
      }
    }

    setHeadingsMap(headingMap);
  }, [element, selector, minLevel]);

  return headingsMap.get('root')?.children;
};

const TOP = 328;
const BOTTOM = 360;

export const useActiveHeading = () => {
  const [activeHeading, setActiveHeading] = useState<
    Element | null | undefined
  >(undefined);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll('h2, h3')
    ) as HTMLElement[];

    let activeHeading: HTMLElement | null = null;
    for (const heading of headings) {
      const { top, bottom } = heading.getBoundingClientRect();
      if (top <= TOP && bottom <= BOTTOM) {
        activeHeading = heading;
      }
    }

    setActiveHeading(activeHeading);

    const scrollHandler = () => {
      let activeHeading: HTMLElement | null = null;
      for (const heading of headings) {
        const { top, bottom } = heading.getBoundingClientRect();
        if (top <= TOP && bottom <= 360) {
          activeHeading = heading;
        }
      }
      setActiveHeading(activeHeading);
    };

    document.addEventListener('scroll', scrollHandler);
    return () => {
      document?.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return activeHeading;
};
