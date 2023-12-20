import { footer } from './footer';
import { mdx } from './mdx';
import { navLinks } from './nav-links';
import { notFound } from './not-found';
import { seo } from './seo';
import { timestamp } from './timestamp';
export default {
  footer,
  mdx,
  navLinks,
  notFound,
  seo,
  test: 'Ciao, mondo!',
  timestamp,
  scrollToTop: 'Torna su',
} as const;
