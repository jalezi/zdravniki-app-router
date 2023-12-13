import { ReactNode } from 'react';

import { EmergencyInfo } from '@/components/emergency-info';
import { Footer } from '@/components/footer';
import { MdxActions } from '@/components/header/mdx-actions';
import { MdxEndBuffer } from '@/components/mdx-end-buffer';
import { MdxToc } from '@/components/mdx-nav';
import { Sidebar } from '@/components/sidebar';
import Timestamp from '@/components/timestamp/Timestamp';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        id='toc-actions-wrapper'
        className='fixed left-0 top-12 z-40 min-h-[2rem]   w-full  bg-brand-50  md:top-16'
      >
        <MdxActions>
          <Timestamp variant='mdx-actions' />
        </MdxActions>
      </div>
      <Sidebar device='mobile' inset='sidebar' from='left' hiddenOn='md'>
        <MdxToc />
      </Sidebar>
      <div
        id='mdx-page-wrapper'
        className='mdx-page-wrapper-grid relative z-[35] mx-auto min-h-[calc(100dvh-8.25rem)] max-w-7xl bg-white md:min-h-[calc(100dvh-11.25rem)]'
      >
        <Sidebar device='md' from='none' hiddenOn='default'>
          <MdxToc />
        </Sidebar>
        <main className='mdx-main-grid mt-8 px-2 pt-4 md:mx-0 md:mr-2'>
          <div className='prose mx-auto mb-8 xl:hidden'>
            <EmergencyInfo />
          </div>

          <article className='prose mx-auto px-4 pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit md:px-0 '>
            {children}
          </article>
          <MdxEndBuffer />
        </main>
        <aside className='mdx-info-grid sticky top-28 mt-10 hidden h-[calc(100dvh-5.5rem)]  text-sm  xl:flex'>
          <EmergencyInfo />
        </aside>
      </div>
      <div id='footer-wrapper' className='footer-wrapper '>
        <Footer variant='mdx' />
      </div>
    </>
  );
}
