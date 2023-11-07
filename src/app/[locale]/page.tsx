import { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';

import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('page.home.seo');

  return {
    title: `${t('title')} - Sledilnik`,
    description: t('description'),
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {t('test')}
    </main>
  );
}
