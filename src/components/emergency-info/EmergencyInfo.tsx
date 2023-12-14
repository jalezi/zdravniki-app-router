import { HTMLAttributes } from 'react';

import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

export interface EmergencyInfoProps extends HTMLAttributes<HTMLDivElement> {}

export default async function EmergencyInfo({ className }: EmergencyInfoProps) {
  const t = await getScopedI18n('mdx');
  return (
    <div
      className={cn(
        'not-prose relative mx-auto flex max-w-7xl gap-2 bg-red-50 px-4 py-2  font-semibold xl:self-start',
        className
      )}
    >
      <span className=''>
        <AlertCircle className=' ' />
      </span>
      <p className='text-sm'>
        <a href='tel:112'>{t('emergencyInfo')}</a>
      </p>
    </div>
  );
}
