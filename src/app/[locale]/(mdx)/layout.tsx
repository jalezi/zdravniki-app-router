import { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { MdxActions } from '@/components/header/mdx-actions';
import MdxEndBuffer from '@/components/mdx-end-buffer/MdxEndBuffer';
import { MdxToc } from '@/components/mdx-nav';
import { Sidebar } from '@/components/sidebar';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MdxActions />
      <Sidebar device='mobile' inset='sidebar' from='left' hiddenOn='md'>
        <MdxToc />
      </Sidebar>
      <div
        id='mdx-page-wrapper'
        className='relative top-8 z-[35] mb-36 bg-white'
      >
        <main className=' mx-2 pt-4'>
          <article className='prose prose-sm mx-auto px-4 pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit sm:px-0'>
            {children}
            <MdxEndBuffer />
          </article>
        </main>
      </div>
      <div id='footer-wrapper' className='footer-wrapper '>
        <Footer variant='mdx' />
      </div>
    </>
  );
}
