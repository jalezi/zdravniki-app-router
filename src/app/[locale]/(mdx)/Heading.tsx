'use client';

import { usePathname } from 'next/navigation';

import { Heading } from '@/components/ui/headings';
import type { HeadingProps } from '@/components/ui/headings';
import { ROUTES_TRANSLATIONS } from '@/lib/constants/segments';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

export const SrOnlyHeading = function SrOnlyHeading(props: HeadingProps) {
  const t = useScopedI18n('seo');
  const locale = useCurrentLocale();
  const pathname = usePathname();

  const segment = pathname?.replaceAll(locale, '').replaceAll('/', '');

  const localeSegments = ROUTES_TRANSLATIONS[locale];
  let canonicalSegment: keyof typeof localeSegments | '' = '';
  for (const key in localeSegments) {
    if (localeSegments[key as keyof typeof localeSegments] === segment) {
      canonicalSegment = key as keyof typeof localeSegments;
      break;
    }
  }

  const seoTitleKey = canonicalSegment
    ? (`title.${canonicalSegment}` as const)
    : '';

  if (!seoTitleKey) {
    return null;
  }

  return (
    <Heading variant='srOnly' {...props}>
      {t(seoTitleKey)}
    </Heading>
  );
};
