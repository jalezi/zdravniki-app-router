import { AlertCircle } from 'lucide-react';

import { getScopedI18n } from '@/locales/server';

export default async function EmergencyInfo() {
  const t = await getScopedI18n('mdx');
  return (
    <p className='prose prose-sm  mx-auto flex gap-2 bg-red-50 px-4 py-2 font-semibold'>
      <AlertCircle />
      {t('emergencyInfo')}
    </p>
  );
}
