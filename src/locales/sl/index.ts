import { footer } from './footer';
import { mdx } from './mdx';
import { navLinks } from './nav-links';
import { notFound } from './not-found';
import { seo } from './seo';
import { skipLinks } from './skip-links';
import { timestamp } from './timestamp';
export default {
  footer,
  mdx,
  navLinks,
  notFound,
  seo,
  skipLinks,
  test: 'Pozdravljen, svet!',
  timestamp,
  scrollToTop: 'Na vrh',
} as const;
