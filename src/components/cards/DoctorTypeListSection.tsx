import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export interface DoctorTypeListSectionProps
  extends HTMLAttributes<HTMLElement>,
    PropsWithChildren {}

export default function DoctorTypeListSection({
  children,
  className,
  ...props
}: DoctorTypeListSectionProps) {
  const styles = cn(
    'rounded-md py-4 px-2 flex flex-col gap-2 border border-brand-200',
    className
  );

  return (
    <section className={styles} {...props}>
      {children}
    </section>
  );
}
