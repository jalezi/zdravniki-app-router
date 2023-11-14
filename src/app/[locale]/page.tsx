import { Metadata } from 'next';
import { getI18n, getScopedI18n } from '@/locales/server';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('seo');

  return {
    title: `${t('title.default')} - Sledilnik`,
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

  return <main>{t('test')}</main>;
}
