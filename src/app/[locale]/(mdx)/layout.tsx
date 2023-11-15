import { ReactNode } from 'react';

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='relative md:mt-6 mx-auto max-w-3xl px-4 md:px-0 bg-white shadow-md'>
        <div className='mx-auto py-4 prose prose-sm prose-a:transition-all prose-a:duration-367 prose-li:marker:text-inherit'>
          {children}
        </div>
      </main>
      <footer>Footer</footer>
    </>
  );
}
