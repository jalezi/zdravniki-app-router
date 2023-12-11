'use client';

import { useEffect, useRef } from 'react';

import { useParams, usePathname } from 'next/navigation';

const MdxEndBuffer = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // determine if last heading can be scrolled to the top of the viewport
    const lastHeading = [
      ...document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ].slice(-1)[0];
    if (!lastHeading) {
      return;
    }

    const parent = lastHeading.parentElement;

    const lastElement = lastHeading.nextElementSibling
      ? lastHeading.nextElementSibling
      : parent?.nextElementSibling;

    // get viewport clientHeight
    const viewportHeight = window.innerHeight;
    const header = document.getElementById('top-header');
    const actions = document.getElementById('toc-actions-wrapper');
    const footer = document.getElementById('footer-wrapper');

    const headerHeight = header?.clientHeight ?? 0;
    const actionsHeight = actions?.clientHeight ?? 0;
    const footerHeight = footer?.clientHeight ?? 0;

    const mainVieportHeight = viewportHeight - headerHeight - actionsHeight;

    // get document rem size
    const remSize = parseInt(
      getComputedStyle(document.documentElement).fontSize
    );

    if (lastElement?.clientHeight ?? 0 + footerHeight < mainVieportHeight) {
      ref.current?.style.setProperty(
        'height',
        `${
          mainVieportHeight -
          footerHeight -
          (lastElement?.clientHeight ?? 0) -
          6.8 * remSize // todo need to figure out what elements, margins, etc is included in this calculation
        }px`
      );
    }
  }, []);

  return <div ref={ref} id='mdx-fake-div' />;
};

export default function FakeMdxEndBuffer() {
  const pathName = usePathname();
  const params = useParams();
  return <MdxEndBuffer key={`${pathName}-${params.locale}`} />;
}
