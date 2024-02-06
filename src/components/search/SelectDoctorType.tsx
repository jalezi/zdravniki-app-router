'use client';

import type { ChangeEvent } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useScopedI18n } from '@/locales/client';

export const SelectDoctorType = function SelectDoctorType() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const t = useScopedI18n('navLinks');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('type', event.target.value);
    } else {
      params.delete('type');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      id='type'
      onChange={handleChange}
      className='flex-1 rounded-3xl border-2 border-text-50 bg-white px-4 py-2 transition-all  duration-367 focus-within:border-brand-500 focus:outline-none child:text-sm sm:flex-none'
    >
      <option value='all'>{t('all')}</option>
      <option value='gp'>{t('gp.label')}</option>
      <option value='ped'>{t('ped.label')}</option>
      <option value='gyn'>{t('gyn.label')}</option>
      <option value='den'>{t('den.label')}</option>
      <option value='den-y'>{t('den-y.label')}</option>
      <option value='den-s'>{t('den-s.label')}</option>
    </select>
  );
};

export default SelectDoctorType;
