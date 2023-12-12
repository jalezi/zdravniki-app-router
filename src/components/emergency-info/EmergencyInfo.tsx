import { AlertCircle } from 'lucide-react';

import { getScopedI18n } from '@/locales/server';

export default async function EmergencyInfo() {
  const t = await getScopedI18n('mdx');
  return (
    <div className='not-prose relative mx-auto flex max-w-7xl gap-2 bg-red-50 px-4 py-2  font-semibold xl:self-start'>
      <span className=''>
        <AlertCircle className=' ' />
      </span>
      <p className='text-sm'>
        <a href='tel:112'>{t('emergencyInfo')}</a>
      </p>
    </div>
  );
}
