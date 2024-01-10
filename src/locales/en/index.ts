import { doctor } from './doctor';
import { footer } from './footer';
import { mdx } from './mdx';
import { navLinks } from './nav-links';
import { notFound } from './not-found';
import { seo } from './seo';
import { skipLinks } from './skip-links';
import { timestamp } from './timestamp';
export default {
  doctor,
  footer,
  mdx,
  navLinks,
  notFound,
  seo,
  skipLinks,
  test: 'Hello, World!',
  timestamp,
  scrollToTop: 'Scroll to top',
} as const;
