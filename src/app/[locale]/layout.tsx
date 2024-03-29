import '@/styles/globals.css';

import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { IBM_Plex_Sans as FontSans } from 'next/font/google';

import { cx } from 'class-variance-authority';

import { ClientProviders } from '@/components/client-providers';
import { Header } from '@/components/header';
import { SkipLinks } from '@/components/skip-links';
import { getSiteUrl } from '@/lib/utils';
import { I18nProviderClient } from '@/locales/client';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';
import Provider from '@/trpc/Provider';

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-sans',
});

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  const title = t('title.default');

  return {
    title: { template: '%s - Zdravniki Sledilnik', default: title },
    description: t('description.default'),
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
      description: t('description.default'),
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = getCurrentLocale();

  return (
    <html lang={locale}>
      <body
        className={cx(
          'scroll-smooth bg-footer-50 font-sans text-text-500 antialiased',
          fontSans.variable
        )}
      >
        <Provider>
          <I18nProviderClient locale={locale}>
            <ClientProviders>
              <SkipLinks />
              <Header />
              {children}
            </ClientProviders>
          </I18nProviderClient>
        </Provider>
      </body>
    </html>
  );
}
