import './globals.css';

import type { Metadata } from 'next';
import { cx } from 'class-variance-authority';
import { IBM_Plex_Sans as FontSans } from 'next/font/google';

import { getCurrentLocale, getScopedI18n } from '@/locales/server';
import { getSiteUrl } from '@/lib';

export const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
  variable: '--font-sans',
});

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  const title = t('title.default');

  return {
    title: { template: '%s - Sledilnik', default: title },
    description: t('description'),
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: getSiteUrl(),
      languages: {
        sl: '/sl',
        en: '/en',
        it: '/it',
      },
    },
    robots: {
      // https://www.conductor.com/academy/meta-robots-tag/
      follow: true,
      index: true,
    },
    openGraph: {
      type: 'website',
      title: `${title} - Sledilnik`,
      description: t('description'),
      images: [
        {
          url: '/opengraph-image.png',
          alt: `${title} - Sledilnik`,
        },
      ],
      locale: getCurrentLocale(),
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Next.js',
    //   description: 'The React Framework for the Web',
    //   siteId: '1467726470533754880',
    //   creator: '@nextjs',
    //   creatorId: '1467726470533754880',
    //   images: ['https://nextjs.org/og.png'],
    // },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getCurrentLocale();

  return (
    <html lang={locale}>
      <body
        className={cx(
          'min-h-[100svh] font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
