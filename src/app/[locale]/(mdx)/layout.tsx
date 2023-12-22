import { ReactNode } from 'react';

import { EmergencyInfo } from '@/components/emergency-info';
import MdxFooter from '@/components/footer/MdxFooter';
import { MdxActions } from '@/components/header/mdx-actions';
import { MdxToc } from '@/components/mdx-nav';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Sidebar } from '@/components/sidebar';
import Timestamp from '@/components/timestamp/Timestamp';
import { getScopedI18n } from '@/locales/server';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  const t = await getScopedI18n('mdx');
  return (
    <>
      <div
        id='toc-actions-wrapper'
        className='fixed left-0 top-12 z-40 min-h-[2rem] w-full bg-brand-50 px-4 md:top-16'
      >
        <MdxActions>
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
            title="Page's progress bar"
            className='progress-bar fixed left-0 top-12 -z-10 h-8 border-b-2 border-brand-500 md:top-16'
          />
        </MdxActions>

        <Sidebar
          id='mobile-toc'
          device='mobile'
          inset='sidebar'
          from='left'
          hiddenOn='md'
          title='Table of Contents'
        >
          <header className='mt-16 xl:mt-0'>
            <h2 className='mdx-scroll-fade-in-out mx-2 mt-2 font-semibold'>
              {t('toc')}
            </h2>
          </header>
          <MdxToc id='mobile-toc-nav' />
        </Sidebar>
      </div>
      <div className='flex min-h-[100dvh] flex-col justify-between'>
        <div id='mdx-page-wrapper' className='flex   flex-col px-4'>
          <div
            id='mdx-main-wrapper'
            className='mdx-main-wrapper-grid relative z-[35] mx-auto mt-20 max-w-7xl grow    md:ml-0 md:mt-24 xl:ml-auto '
          >
            <Sidebar
              id='desktop-toc'
              device='md'
              from='none'
              hiddenOn='default'
              title='Table of Contents'
            >
              <div className='px-2'>
                <EmergencyInfo className='mdx-scroll-fade-in-out xl:hidden' />
              </div>
              <header className='mt-8 xl:mt-0'>
                <h2 className='mdx-scroll-fade-in-out mx-2 mt-2 font-semibold'>
                  {t('toc')}
                </h2>
              </header>
              <MdxToc id='desktop-toc-nav' />
            </Sidebar>
            <main className='mdx-main-grid px-4'>
              <article className='prose mx-auto  pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit  '>
                {children}
              </article>
            </main>
            <aside className='mdx-info-grid sticky top-24 isolate hidden max-h-[calc(100dvh-5rem)] py-10 text-sm  md:max-h-[calc(100dvh-6rem)] xl:flex'>
              <EmergencyInfo />
            </aside>
          </div>
        </div>
        <MdxFooter />
      </div>
      <ScrollToTop
        variant='icon'
        position='fixed'
        hiddenOn='md'
        offset={100}
        notVisiblePosition='right_24'
      />
    </>
  );
}
