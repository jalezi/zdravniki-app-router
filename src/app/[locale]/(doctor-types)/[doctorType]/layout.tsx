import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id='dr-main-wrapper' className='mt-12 md:mt-16'>
      {children}
    </div>
  );
}
