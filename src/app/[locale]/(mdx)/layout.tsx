import { ReactNode } from 'react';

import { EmergencyInfo } from '@/components/emergency-info';
import { Footer } from '@/components/footer';
import { MdxActions } from '@/components/header/mdx-actions';
import { MdxToc } from '@/components/mdx-nav';
import { Sidebar } from '@/components/sidebar';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MdxActions />
      <Sidebar device='mobile' inset='sidebar' from='left' hiddenOn='md'>
        <EmergencyInfo />
        <MdxToc />
      </Sidebar>
      <div
        id='mdx-page-wrapper'
        className='relative top-8 z-[35] mb-24  bg-white'
      >
        <main className='pt-4'>
          <article className='prose prose-sm mx-auto px-4 pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit sm:px-0'>
            {children}
          </article>
        </main>
      </div>
      <div id='footer-wrapper' className='footer-wrapper '>
        <Footer variant='mdx' />
      </div>
    </>
  );
}
