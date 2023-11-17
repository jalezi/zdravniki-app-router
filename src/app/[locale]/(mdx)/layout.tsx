import { ReactNode } from 'react';

import { Footer } from '@/components/footer';

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='relative mx-auto max-w-3xl bg-white px-4 pb-8 shadow-md md:mt-6 md:px-0'>
        <div className='prose prose-sm mx-auto py-4 prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit'>
          {children}
        </div>
      </main>
      <Footer variant='mdx' />
    </>
  );
}
