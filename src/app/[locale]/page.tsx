import { Metadata } from 'next';

import { setStaticParamsLocale } from 'next-international/server';

import { getI18n, getScopedI18n, getStaticParams } from '@/locales/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  return {
    title: `${t('title.default')} - Zdravniki Sledilnik`,
    description: t('description.default'),
  };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return (
    <main className='mt-12 md:mt-16'>
      <h1>{t('test')}</h1>
    </main>
  );
}
