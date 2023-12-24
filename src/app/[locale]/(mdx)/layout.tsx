import { ReactNode } from 'react';

import { headers } from 'next/headers';

import { EmergencyInfo } from '@/components/emergency-info';
import MdxFooter from '@/components/footer/MdxFooter';
import { MdxActions } from '@/components/header/mdx-actions';
import { MdxToc } from '@/components/mdx-nav';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Sidebar } from '@/components/sidebar';
import Timestamp from '@/components/timestamp/Timestamp';
import { SEGMENTS_TRANSLATIONS } from '@/lib/constants/segments';
import { Locales } from '@/locales/config';
import { getScopedI18n } from '@/locales/server';

export interface MdxLayoutProps {
  children: ReactNode;
  params: { locale: Locales };
}

export default async function MdxLayout({
  children,
  params: { locale },
}: MdxLayoutProps) {
  const headerList = headers();

  const segment = headerList
    .get('x-pathname')
    ?.replaceAll(locale, '')
    .replaceAll('/', '');

  const localeSegments = SEGMENTS_TRANSLATIONS[locale];
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

  const t = await getScopedI18n('mdx');
  const tSeo = await getScopedI18n('seo');
  return (
    <div className='flex min-h-[100dvh] flex-col justify-between '>
      <div
        id='toc-actions-wrapper'
        className='fixed left-0 top-12 z-40 min-h-[2rem] w-full bg-brand-50 px-4 md:top-16'
      >
        <MdxActions aria-label={t('mdxActions')} title={t('mdxActions')}>
          <div className='ml-auto md:ml-0'>
            <Timestamp variant='mdx-actions' />
          </div>
          <ScrollToTop
            variant='text'
            position='relative'
            visibleOn='md'
            offset={100}
            className='ml-auto '
          />
          <div
            role='progressbar'
            title={t('progressBar')}
            className='progress-bar fixed left-0 top-12 -z-10 h-8 border-b-2 border-brand-500 md:top-16'
          />
          <div className='fixed left-0 top-12 -z-20 h-8 w-screen border-b-2 border-white md:top-16' />
        </MdxActions>
      </div>
      <main id='content' className='px-4 md:px-0'>
        {seoTitleKey ? <h1 className='sr-only'>{tSeo(seoTitleKey)}</h1> : null}
        <Sidebar
          id='mobile-toc'
          device='mobile'
          inset='sidebar'
          from='left'
          hiddenOn='md'
          aria-label={`${t('toc')} ${t('mobile')} ${t('sidebar')}`}
        >
          <header
            id='mobile-toc-header'
            className='sticky top-0 z-10 bg-inherit px-2 py-4'
          >
            <h2 className='font-semibold'>{t('toc')}</h2>
          </header>
          <MdxToc
            id='mobile-toc-nav'
            aria-label={`${t('toc')} ${t('mobile')}`}
          />
        </Sidebar>

        <div
          id='mdx-main-content'
          className='mdx-main-content-grid relative z-[35] mx-auto mt-20 max-w-7xl grow md:ml-0 md:mt-24 xl:ml-auto'
        >
          <Sidebar
            id='desktop-toc'
            device='md'
            from='none'
            hiddenOn='default'
            className='mdx-aside-grid fill-mode-backwards'
            aria-label={`${t('toc')} ${t('desktop')} ${t('sidebar')}`}
          >
            <header className='sticky top-0 z-10 flex flex-col gap-2 bg-inherit px-2 py-4'>
              <EmergencyInfo className=' xl:hidden' />
              <h2 className='font-semibold'>{t('toc')}</h2>
            </header>
            <MdxToc
              id='desktop-toc-nav'
              aria-label={`${t('toc')} ${t('desktop')}`}
            />
          </Sidebar>
          <div className='mdx-main-grid px-4'>
            <article className='prose mx-auto  pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit  '>
              {children}
            </article>
          </div>
          <Sidebar
            id='info-additional'
            device='xl'
            from='none'
            hiddenOn='default'
            aria-label={`${t('infoAdditional')} ${t('sidebar')}`}
            className='mdx-info-grid'
          >
            <header className='sticky top-0 z-10 flex flex-col gap-2 bg-inherit px-2 py-4'>
              <EmergencyInfo />
            </header>
          </Sidebar>
        </div>
      </main>
      <MdxFooter />
      <ScrollToTop
        variant='icon'
        position='fixed'
        hiddenOn='md'
        offset={100}
        notVisiblePosition='right_24'
      />
    </div>
  );
}
