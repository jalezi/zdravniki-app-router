import { ReactNode } from 'react';

import { Footer } from '@/components/footer';

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <aside className='sticky left-0 top-12 z-50 bg-white md:top-16'>
        Neki
      </aside>
      <div id='main-wrapper' className='relative z-40  bg-white  '>
        <main className='mx-auto mb-24 grid min-h-[calc(100svh-10rem)] max-w-3xl place-items-center px-6 pb-8  md:min-h-[calc(100svh-12rem)] md:px-0'>
          <div className='prose prose-sm mx-auto pb-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit '>
            <p>
              V primeru, da potrebujete nujno medicinsko pomoč, se obrnite na
              lokalno urgentno službo oz. pokličite 112.
            </p>
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
