import { ReactNode } from 'react';

import MdxFooter from '@/components/footer/MdxFooter';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id='dr-main-wrapper' className='relative h-full pt-12 md:pt-16'>
      {children}
      <MdxFooter />
    </div>
  );
}
