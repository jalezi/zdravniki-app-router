import { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { MdxActions } from '@/components/header/mdx-actions';

export default async function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MdxActions />
      <div
        id='mdx-page-wrapper'
        className='relative top-8 z-[35] mb-24  bg-white'
      >
        <main className=''>
          <div className='prose prose-sm mx-4  pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit '>
            <article>{children}</article>
          </div>
        </main>
      </div>
      <div id='footer-wrapper' className='footer-wrapper '>
        <Footer variant='mdx' />
      </div>
    </>
  );
}
