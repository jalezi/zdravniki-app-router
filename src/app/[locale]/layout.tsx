import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import {
  getCurrentLocale,
  getScopedI18n,
  getStaticParams,
} from '@/locales/server';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('page.home.seo');

  return {
    title: { template: '%s - Sledilnik', default: t('title') },
    description: t('description'),
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
