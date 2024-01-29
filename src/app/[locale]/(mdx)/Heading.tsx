'use client';

import { usePathname } from 'next/navigation';

import { Heading } from '@/components/ui/headings';
import type { HeadingProps } from '@/components/ui/headings';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

const SEGMENTS = {
  faq: 'faq',
  'pogosta-vprasanja': 'faq',
  'domande-frequenti': 'faq',
  about: 'about',
  'o-projektu': 'about',
  'il-progetto': 'about',
} as const;

export const SrOnlyHeading = function SrOnlyHeading(props: HeadingProps) {
  const t = useScopedI18n('seo');
  const locale = useCurrentLocale();
  const pathname = usePathname();

  const segment = pathname
    ?.replaceAll(locale, '')
    .replaceAll('/', '') as keyof typeof SEGMENTS;

  const canonicalSegment: (typeof SEGMENTS)[keyof typeof SEGMENTS] =
    SEGMENTS[segment];

  const seoTitleKey = `title.${canonicalSegment}` as const;

  const seoTitle = t(seoTitleKey);

  return (
    <Heading variant='srOnly' {...props}>
      {seoTitle}
    </Heading>
  );
};
