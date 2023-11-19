import { ReactNode } from 'react';

import { Footer } from '@/components/footer';

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div id='main-wrapper' className='relative z-40 bg-[#f4f8f8] '>
        <main className='mx-auto mb-24 grid min-h-[calc(100svh-10rem)] max-w-3xl place-items-center bg-white px-6 pb-8 shadow-md md:mt-6 md:min-h-[calc(100svh-12rem)] md:px-0'>
          <div className='prose prose-sm mx-auto py-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit '>
            {children}
          </div>
        </main>
      </div>
      <div
        id='footer-wrapper'
        className='fixed bottom-0 left-0 right-0 z-30 border-t border-dashed border-text-200'
      >
        <Footer variant='mdx' />
      </div>
    </>
  );
}
